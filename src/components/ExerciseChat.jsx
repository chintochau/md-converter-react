import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked'
import { fetchExercisePlan } from '../services/api'
import ExerciseList from './ExerciseList'
import './ExerciseChat.css'

function ExerciseChat({ sessionId, setSessionId, setModel, environment }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)
  const [messages, setMessages] = useState([])
  const [useStreaming, setUseStreaming] = useState(true)
  const [rightPanelTab, setRightPanelTab] = useState('exercises')
  const [expandedMessage, setExpandedMessage] = useState(null)
  const abortControllerRef = useRef(null)
  const messagesEndRef = useRef(null)
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Convert image URLs to markdown image syntax
  const processImageUrls = (text) => {
    if (!text) return text
    
    // Debug: Log the original text to see what we're working with
    console.log('Processing text for images:', text.substring(0, 200) + '...')
    
    // First, convert markdown links to images if they point to image files
    // Pattern: [any text](url ending with image extension)
    const markdownLinkToImagePattern = /\[([^\]]+)\]\((https?:\/\/[^)]+\.(?:jpg|jpeg|png|gif|webp|svg|bmp)(?:\?[^)]*)?)\)/gi
    text = text.replace(markdownLinkToImagePattern, (match, linkText, url) => {
      console.log('Converting link to image:', match)
      return `![${linkText}](${url})`
    })
    
    // Then, convert standalone image URLs to markdown image syntax
    // Pattern to match image URLs (common image extensions)
    const imageUrlPattern = /(?<![([])(https?:\/\/[^\s)]+\.(?:jpg|jpeg|png|gif|webp|svg|bmp)(?:\?[^\s)]*)?)(?![)\]])/gi
    
    // Replace standalone image URLs with markdown image syntax
    text = text.replace(imageUrlPattern, (match, url) => {
      // Check if it's already in markdown image syntax
      if (text.includes(`![`) && text.includes(`](${url})`)) {
        return match
      }
      console.log('Converting URL to image:', url)
      return `![Image](${url})`
    })
    
    return text
  }

  const handleStreamingResponse = async (userQuery) => {
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    
    const newMessage = {
      id: Date.now(),
      query: userQuery,
      response: '',
      responseHtml: '',
      exercises: [],
      timestamp: new Date().toLocaleTimeString(),
      isStreaming: true
    }
    
    setMessages(prev => [...prev, newMessage])
    
    try {
      // Get the configuration based on the selected environment
      const API_CONFIGS = {
        'production-v1.2': {
          baseUrl: 'https://node6898-env-8937861.ca-east.onfullhost.cloud:11008/api/v1.2',
          apiKey: 'wibbi-api-key'
        },
        'production-v1.3': {
          baseUrl: 'https://node6898-env-8937861.ca-east.onfullhost.cloud:11008/api/v1.3',
          apiKey: 'wibbi-api-key'
        },
        'localhost-v1.2': {
          baseUrl: 'http://localhost:3000/api/v1.2',
          apiKey: 'wibbi-api-key'
        },
        'localhost-v1.3': {
          baseUrl: 'http://localhost:3000/api/v1.3',
          apiKey: 'wibbi-api-key'
        }
      }
      
      const config = API_CONFIGS[environment] || API_CONFIGS['production-v1.2']
      let url = `${config.baseUrl}/exercises/chat/stream?prompt=${encodeURIComponent(userQuery)}`
      
      // Add session_id if available
      if (sessionId) {
        url += `&session_id=${encodeURIComponent(sessionId)}`
      }
      
      const response = await fetch(url, {
        headers: {
          'x-api-key': config.apiKey
        },
        signal: abortController.signal
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let finalData = {}
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        
        for (const line of lines) {
          if (line.startsWith('event:')) {
            continue
          }
          
          if (line.startsWith('data:')) {
            try {
              const data = JSON.parse(line.substring(5))
              
              if (data.output) {
                finalData = data
                marked.setOptions({ 
                  breaks: true, 
                  gfm: true,
                  // Enable images to be displayed
                  sanitize: false
                })
                // Process image URLs before parsing
                const processedOutput = processImageUrls(data.output)
                const outputHtml = marked.parse(processedOutput)
                
                setMessages(prev => prev.map(msg => 
                  msg.id === newMessage.id 
                    ? { ...msg, response: data.output, responseHtml: outputHtml, isStreaming: true }
                    : msg
                ))
              }
              
              if (data.session_id) setSessionId(data.session_id)
              if (data.model) setModel(data.model)
            } catch (err) {
              console.error('Error parsing SSE data:', err)
            }
          }
        }
      }
      
      // Final update with exercises if available
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id 
          ? { ...msg, exercises: finalData.result || [], isStreaming: false }
          : msg
      ))
      if (finalData.result) {
        setResponse(finalData)
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, response: `Error: ${err.message}`, isStreaming: false }
            : msg
        ))
      }
    } finally {
      abortControllerRef.current = null
    }
  }
  
  const handleNormalResponse = async (userQuery) => {
    // Add placeholder message with loading state
    const newMessage = {
      id: Date.now(),
      query: userQuery,
      response: '',
      responseHtml: '',
      exercises: [],
      timestamp: new Date().toLocaleTimeString(),
      isLoading: true
    }
    
    setMessages(prev => [...prev, newMessage])
    
    try {
      const data = await fetchExercisePlan(userQuery, sessionId, environment)
      
      if (data.output) {
        marked.setOptions({ 
          breaks: true, 
          gfm: true,
          // Enable images to be displayed
          sanitize: false
        })
        // Process image URLs before parsing
        const processedOutput = processImageUrls(data.output)
        data.outputHtml = marked.parse(processedOutput)
      }
      
      // Update the message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id 
          ? { ...msg, response: data.output, responseHtml: data.outputHtml, exercises: data.result || [], isLoading: false }
          : msg
      ))
      setResponse(data)
      
      if (data.session_id) setSessionId(data.session_id)
      if (data.model) setModel(data.model)
    } catch (err) {
      setError(err.message)
      // Update message to show error
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id 
          ? { ...msg, response: `Error: ${err.message}`, isLoading: false }
          : msg
      ))
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    const userQuery = query
    setQuery('')
    
    try {
      if (useStreaming) {
        await handleStreamingResponse(userQuery)
      } else {
        await handleNormalResponse(userQuery)
      }
    } finally {
      setLoading(false)
    }
  }
  
  const cancelStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setLoading(false)
    }
  }

  return (
    <div className="exercise-chat">
      <div className="chat-layout">
        {/* Chat Section - Left Side */}
        <div className="chat-section">
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <p>Start a conversation to generate your exercise plan!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="message-group">
                  <div className="user-message">
                    <span className="message-label">You:</span>
                    <div className="message-content">{message.query}</div>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                  <div className="assistant-message">
                    <div className="message-header">
                      <span className="message-label">Assistant:</span>
                      {!message.isStreaming && !message.isLoading && message.response && (
                        <button 
                          className="expand-button"
                          onClick={() => {
                            setExpandedMessage(message)
                            setRightPanelTab('message')
                          }}
                          title="Expand message"
                        >
                          ⤢
                        </button>
                      )}
                    </div>
                    <div className="message-content">
                      {message.isLoading ? (
                        <div className="typing-indicator">
                          <span className="typing-dot"></span>
                          <span className="typing-dot"></span>
                          <span className="typing-dot"></span>
                        </div>
                      ) : (
                        <>
                          {message.responseHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: message.responseHtml }} />
                          ) : message.response ? (
                            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                              {message.response}
                            </pre>
                          ) : message.isStreaming ? (
                            <span style={{ color: '#6b7280', fontStyle: 'italic' }}>
                              Thinking...
                            </span>
                          ) : null}
                          {message.isStreaming && (
                            <div className="typing-indicator inline">
                              <span className="typing-dot"></span>
                              <span className="typing-dot"></span>
                              <span className="typing-dot"></span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="chat-form">
            {error && (
              <div className="error-message">
                Error: {error}
              </div>
            )}
            <div className="streaming-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={useStreaming}
                  onChange={(e) => setUseStreaming(e.target.checked)}
                />
                Use streaming response
              </label>
            </div>
            <div className="input-group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., create a plan for me, i need jumping, running, and stretching exercises for a week"
                className="query-input"
                disabled={loading}
              />
              {loading && useStreaming ? (
                <button type="button" onClick={cancelStream} className="cancel-button">
                  Cancel
                </button>
              ) : (
                <button type="submit" disabled={loading || !query.trim()}>
                  {loading ? 'Generating...' : 'Send'}
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Right Panel with Tabs */}
        <div className="exercises-section">
          <div className="right-panel-tabs">
            <button 
              className={`tab-button ${rightPanelTab === 'exercises' ? 'active' : ''}`}
              onClick={() => setRightPanelTab('exercises')}
            >
              Exercises {response && response.result ? `(${response.result.length})` : ''}
            </button>
            <button 
              className={`tab-button ${rightPanelTab === 'message' ? 'active' : ''}`}
              onClick={() => setRightPanelTab('message')}
            >
              Message View
            </button>
          </div>
          
          <div className="tab-content">
            {rightPanelTab === 'exercises' ? (
              response && response.result && response.result.length > 0 ? (
                <ExerciseList exercises={response.result} />
              ) : (
                <div className="empty-exercises">
                  <p>Exercise details will appear here when you generate a plan.</p>
                </div>
              )
            ) : (
              expandedMessage ? (
                <div className="expanded-message">
                  <div className="expanded-message-header">
                    <h4>Message from {expandedMessage.timestamp}</h4>
                    <button 
                      className="close-button"
                      onClick={() => setExpandedMessage(null)}
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="expanded-message-content">
                    {expandedMessage.responseHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: expandedMessage.responseHtml }} />
                    ) : expandedMessage.response ? (
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                        {expandedMessage.response}
                      </pre>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="empty-exercises">
                  <p>Click the expand button (⤢) on any message to view it here.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseChat