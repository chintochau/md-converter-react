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
  const [showMarkdown, setShowMarkdown] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchExercisePlan(query)
      // Parse the markdown output to HTML
      if (data.output) {
        data.outputHtml = marked.parse(data.output)
      }
      setResponse(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="exercise-chat">
      <h2>Exercise Plan Generator</h2>
      
      <form onSubmit={handleSubmit} className="query-form">
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
            {loading ? 'Generating...' : 'Generate Plan'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      {response && (
        <div className="response-container">
          <div className="view-toggle">
            <button 
              className={showMarkdown ? 'active' : ''} 
              onClick={() => setShowMarkdown(true)}
            >
              Plan View
            </button>
            <button 
              className={!showMarkdown ? 'active' : ''} 
              onClick={() => setShowMarkdown(false)}
            >
              Exercise List
            </button>
          </div>

          {showMarkdown ? (
            <div className="markdown-output">
              <h3>Your Exercise Plan</h3>
              <div 
                className="plan-content"
                dangerouslySetInnerHTML={{ __html: response.outputHtml }}
              />
            </div>
          ) : (
            <ExerciseList exercises={response.result || []} />
          )}

          <div className="session-info">
            <span>Session ID: {response.session_id}</span>
            <span>Model: {response.model}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExerciseChat