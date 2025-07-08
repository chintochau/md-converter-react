import { useState } from 'react'
import { marked } from 'marked'
import { fetchExercisePlan } from '../services/api'
import ExerciseList from './ExerciseList'
import './ExerciseChat.css'

function ExerciseChat() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)
  const [messages, setMessages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchExercisePlan(query)
      
      // Parse the markdown output to HTML
      if (data.output) {
        // Configure marked for better rendering
        marked.setOptions({
          breaks: true,
          gfm: true,
        })
        data.outputHtml = marked.parse(data.output)
      }
      
      // Add message to chat history
      const newMessage = {
        id: Date.now(),
        query: query,
        response: data.output,
        responseHtml: data.outputHtml,
        exercises: data.result || [],
        timestamp: new Date().toLocaleTimeString()
      }
      
      setMessages(prev => [...prev, newMessage])
      setResponse(data)
      setQuery('') // Clear input after successful submission
    } catch (err) {
      setError(err.message)
    } finally {
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
                    <span className="message-label">Assistant:</span>
                    <div className="message-content">
                      {message.responseHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: message.responseHtml }} />
                      ) : (
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                          {message.response || 'No content available'}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="chat-form">
            {error && (
              <div className="error-message">
                Error: {error}
              </div>
            )}
            <div className="input-group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., create a plan for me, i need jumping, running, and stretching exercises for a week"
                className="query-input"
                disabled={loading}
              />
              <button type="submit" disabled={loading || !query.trim()}>
                {loading ? 'Generating...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Exercise List - Right Side */}
        <div className="exercises-section">
          <h3>Exercises {response && response.result ? `(${response.result.length})` : ''}</h3>
          {response && response.result && response.result.length > 0 ? (
            <ExerciseList exercises={response.result} />
          ) : (
            <div className="empty-exercises">
              <p>Exercise details will appear here when you generate a plan.</p>
            </div>
          )}
        </div>
      </div>
      
      {response && (
        <div className="session-info">
          <span>Session ID: {response.session_id}</span>
          <span>Model: {response.model}</span>
        </div>
      )}
    </div>
  )
}

export default ExerciseChat