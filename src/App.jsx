import { useState, useEffect } from 'react'
import { marked } from 'marked'
import ExerciseChat from './components/ExerciseChat'
import './App.css'

const INITIAL_CONTENT = `# Weekly Exercise Plan: Jumping, Running, & Stretching\\n\\n**Plan Name:** Weekly Exercise Plan  \\n**Plan Type:** Weekly  \\n**Created At:** 2025-07-08  \\n**User Description:** Jumping, running, and stretching exercises for a week, balanced across all levels.  \\n**Total Exercises Included:** 12 (Carefully balanced for intensity, recovery, and safety.)\\n\\n---\\n\\n## Introduction\\n\\nWelcome to your **Weekly Exercise Plan**! This program is designed for a balanced progression of jumping, running, and stretching movements. You'll enhance cardiovascular fitness, muscular power, flexibility, and mobility while following a safe and structured approach.\\n\\n---\\n\\n## Plan Structure & Logic\\n\\n- **Balanced Routine:** Alternates high-intensity activities, moderate running, and flexibility work.\\n- **Progression Focus:** Gradual increase in difficulty and volume.\\n- **Safety First:** All sessions start with a warm-up and end with stretching or cool-down.\\n- **Flexibility:** Adaptable to your schedule—move sessions if needed, but maintain at least one active rest day.`

function App() {
  const [activeTab, setActiveTab] = useState('exercise')
  const [rawContent, setRawContent] = useState(INITIAL_CONTENT)
  const [conversionMethod, setConversionMethod] = useState('replace')
  const [htmlOutput, setHtmlOutput] = useState('')

  const convertContent = () => {
    let cleanedContent = ''
    
    switch(conversionMethod) {
      case 'replace':
        cleanedContent = rawContent.replace(/\\n/g, '\n')
        break
        
      case 'regex':
        cleanedContent = rawContent
          .replace(/\\n\\n/g, '\n\n')
          .replace(/\\n/g, '\n')
          .replace(/\n{3,}/g, '\n\n')
          .trim()
        break
        
      case 'split':
        cleanedContent = rawContent
          .split('\\n')
          .join('\n')
          .replace(/\n{3,}/g, '\n\n')
          .trim()
        break
    }
    
    const html = marked.parse(cleanedContent)
    setHtmlOutput(html)
  }

  const clearContent = () => {
    setRawContent('')
    setHtmlOutput('')
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(htmlOutput).then(() => {
      alert('HTML copied to clipboard!')
    })
  }

  const downloadOutput = () => {
    const blob = new Blob(
      [`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Converted Content</title></head><body>${htmlOutput}</body></html>`], 
      {type: 'text/html'}
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted-content.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    convertContent()
  }, [])

  return (
    <div className={`app ${activeTab === 'exercise' ? 'app-fullwidth' : ''}`}>
      <div className="tab-navigation">
        <button 
          className={`tab ${activeTab === 'converter' ? 'active' : ''}`}
          onClick={() => setActiveTab('converter')}
        >
          Markdown Converter
        </button>
        <button 
          className={`tab ${activeTab === 'exercise' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercise')}
        >
          Exercise Plan Generator
        </button>
      </div>

      {activeTab === 'converter' ? (
        <div className="container">
          <div className="input-section">
            <h2>Raw Content (paste your content here)</h2>
            <div className="controls">
              <div className="method-selector">
                <label>
                  <input 
                    type="radio" 
                    name="method" 
                    value="replace" 
                    checked={conversionMethod === 'replace'}
                    onChange={(e) => setConversionMethod(e.target.value)}
                  />
                  Replace \n
                </label>
                
                <label>
                  <input 
                    type="radio" 
                    name="method" 
                    value="regex"
                    checked={conversionMethod === 'regex'}
                    onChange={(e) => setConversionMethod(e.target.value)}
                  />
                  Smart Clean
                </label>
                
                <label>
                  <input 
                    type="radio" 
                    name="method" 
                    value="split"
                    checked={conversionMethod === 'split'}
                    onChange={(e) => setConversionMethod(e.target.value)}
                  />
                  Split & Join
                </label>
              </div>
              <button onClick={convertContent}>Convert</button>
              <button onClick={clearContent}>Clear</button>
            </div>
            <textarea 
              id="rawInput"
              value={rawContent}
              onChange={(e) => setRawContent(e.target.value)}
              placeholder="Paste your markdown content with \n characters here..."
            />
          </div>
          
          <div className="output-section">
            <h2>Converted Output</h2>
            <div className="controls">
              <button onClick={copyOutput}>Copy HTML</button>
              <button onClick={downloadOutput}>Download</button>
            </div>
            <div 
              id="output"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          </div>
        </div>
      ) : (
        <ExerciseChat />
      )}
    </div>
  )
}

export default App
