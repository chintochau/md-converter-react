import { useState, useEffect } from 'react'
import { marked } from 'marked'
import ExerciseChat from './components/ExerciseChat'
import './App.css'

const INITIAL_CONTENT = `# Weekly Exercise Plan  \n*Created: 2025-07-08 | Type: Balanced Jump/Run/Stretch*\n\n---\n\n## Overview\n\nThis 7-day exercise plan combines **jumping, running, and stretching** for well-rounded fitness.  \n**Every day includes stretching for mobility and recovery.** Jumping and running exercises alternate for variety and to promote full-body conditioning.  \nThe plan is suitable for intermediate users, with options to scale up/down based on fitness level.  \n**Primary goals:** Increase power, endurance, flexibility, coordination, and general conditioning.\n\n---\n\n## How to Use This Plan\n\n- **Warm up** before each session (light activity + dynamic stretches)\n- **Follow the daily structure** as outlined below\n- Rest **30–60 seconds** between exercise sets unless otherwise noted\n- Listen to your body – quality and safety come first!\n- At week's end, reflect on progress and adjust for future cycles\n\n---\n\n## Weekly Structure\n\n| Day      | Focus                         |\n|----------|------------------------------|\n| Day 1    | Jumping + Stretching         |\n| Day 2    | Running + Stretching         |\n| Day 3    | Jumping + Stretching         |\n| Day 4    | Running + Stretching         |\n| Day 5    | Jumping + Stretching         |\n| Day 6    | Running + Stretching         |\n| Day 7    | Active Recovery (Stretching) |\n\n---\n\n## Daily Session Layout\n\nEach day follows this structure:\n1. **Warm-Up** – 5 minutes of light aerobic or dynamic movements\n2. **Main Block** – 2–3 Jumping/Running Exercises as per theme\n3. **Stretching Block** – At least 2 stretching exercises\n4. **Cool-Down** – Light walking, breathing, or additional gentle stretching (3–5 min)\n\n---\n\n## Daily Details\n\n### **Day 1: Jumping + Stretching**\n- **Jumping Jacks** (Beginner, Coordination & Cardio): 3 sets x 30–45 sec  \n- **Jump Squats** (Intermediate, Power & Strength): 3 sets x 10–12 reps  \n- **Stretching Block:**  \n  - Global Stretching Exercise on Ball: 2 x 45 sec per position  \n  - Shoulder Stretching: 2 x 30 sec\n\n### **Day 2: Running + Stretching**\n- **Jogging (Land or Aquatic)**: 3 x 4–6 min, moderate pace  \n- **DB Running Exercise** (with light dumbbells): 2 sets x 30 sec  \n- **Stretching Block:**  \n  - Stretch with Partner: 2 x 30 sec pulls per person  \n  - Shoulder Stretching: 2 x 30 sec\n\n### **Day 3: Jumping + Stretching**\n- **Forward Jumps, Feet Together**: 3 sets x 8–10 jumps  \n- **Jump Squats** (if knees healthy): 2 sets x 10 reps  \n- **Stretching Block:**  \n  - Global Stretching Exercise on Ball: 2 x 45 sec per position  \n  - Stretch with Partner: 2 x 30 sec\n\n### **Day 4: Running + Stretching**\n- **Jogging (Land or Aquatic)**: 3 x 5 min, maintain good form  \n- **DB Running Exercise**: 3 sets x 20 sec fast/slow alternation  \n- **Stretching Block:**  \n  - Shoulder Stretching: 3 x 30 sec  \n  - Global Stretching on Ball: 1 x 60 sec\n\n### **Day 5: Jumping + Stretching**\n- **Jumping Jacks**: 3 sets x 1 min  \n- **Forward Jumps, Feet Together**: 3 sets x 12 reps  \n- **Stretching Block:**  \n  - Stretch with Partner: 2 x 45 sec  \n  - Global Stretching Exercise on Ball: 2 x 45 sec\n\n### **Day 6: Running + Stretching**\n- **Jogging (Mix Land/Aquatic if possible)**: 2 x 6 min (change intensity half-way if desired)  \n- **DB Running Exercise**: 2 sets x 40 sec  \n- **Stretching Block:**  \n  - Shoulder Stretching: 2 x 30 sec  \n  - Stretch with Partner: 2 x 30 sec\n\n### **Day 7: Active Recovery — Full Body Stretch**\n- **Take a break from intense movement.**  \n- **Stretching Block:**  \n  - Global Stretching Exercise on Ball: 3 rounds, slow and mindful  \n  - Stretch with Partner: 2 x 1 min  \n  - Shoulder Stretching: 2 x 30 sec  \n- Optional: Easy stroll outdoors, gentle yoga, deep breathing\n\n---\n\n## Exercise Descriptions & Cues\n\n**Jumping Jacks**  \n- Arms overhead as feet jump apart, return to side as feet close  \n- Maintain upright posture, soft landings  \n- *Cardio warm-up, easy to learn*\n\n**Jump Squats**  \n- Deep squat, drive upward explosively, soft landing  \n- Use arms for balance, keep chest up  \n- Ideal for developing leg power\n\n**Forward Jumps, Feet Together**  \n- Swing arms, jump forward, land softly with both feet together  \n- Focus on safe, controlled landings  \n\n**DB Running Exercise**  \n- Hold light dumbbells, swing arms in running pattern  \n- Emphasizes shoulder/upper body endurance, control speed\n\n**Jogging**  \n- Maintain upright posture, moderate pace  \n- Land softly, stride short and quick  \n- Water option: provides joint support and resistance\n\n**Global Stretching Exercise on Ball**  \n- Multi-position stretch with stability ball for spine, chest, hips  \n- Move slowly between positions, focus on deep breathing\n\n**Stretch with Partner**  \n- Seated, using towel/band for gentle hamstring/back stretch  \n- Communicate clearly, move in and out slowly  \n\n**Shoulder Stretching**  \n- Reach arms forward, keep shoulders relaxed and low  \n- Focus on gentle, pain-free motion\n\n---\n\n## Safety Guidelines\n\n- **Do not perform jumping exercises if you have acute knee, ankle, or lower limb injuries**\n- **Land softly in all jump movements and avoid hard surfaces**\n- **Stretch within a comfortable range, avoid pain; no bouncing**\n- **Use proper shoes and choose safe environments (especially for land running/jumping)**\n- **Communicate with partner during assisted stretches to prevent overstretching**\n- **Warm up adequately to prepare muscles and joints**\n- **Hydrate before, during, and after exercise**\n\n---\n\n## Progression and Adaptation Tips\n\n- New to these movements? Start on the lower end of reps/sets and increase gradually.\n- Feeling strong? Add one extra set or increase time for each exercise next week.\n- For jumping/running, focus on good form before pushing intensity.\n- Increase stretch time slightly each week and explore additional positions as comfort grows.\n- Always take at least one day of active recovery/stretching per week.\n\n---\n\n## Motivation\n\nStay consistent—short, daily sessions add up to real progress!  \nVariation keeps training fun, and this plan balances intensity with recovery.  \nListen to your body and celebrate each step forward!\n\n---\n\n### *Finish the week strong, stay active, and embrace the challenge!*\n\n---\n\n**Questions? Need modifications? Consult a fitness professional or coach.**`

function App() {
  const [activeTab, setActiveTab] = useState('exercise')
  const [rawContent, setRawContent] = useState(INITIAL_CONTENT)
  const [conversionMethod, setConversionMethod] = useState('replace')
  const [htmlOutput, setHtmlOutput] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const [model, setModel] = useState(null)
  const [selectedEnvironment, setSelectedEnvironment] = useState('production-v1.2')
  const [chatKey, setChatKey] = useState(0)

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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`app ${activeTab === 'exercise' ? 'app-fullwidth' : ''}`}>
      <div className="tab-navigation">
        <div className="tabs-left">
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
          {activeTab === 'exercise' && (
            <select 
              className="environment-selector"
              value={selectedEnvironment}
              onChange={(e) => setSelectedEnvironment(e.target.value)}
            >
              <option value="production-v1.2">Production v1.2</option>
              <option value="production-v1.3">Production v1.3</option>
              <option value="localhost-v1.2">Localhost v1.2</option>
              <option value="localhost-v1.3">Localhost v1.3</option>
            </select>
          )}
        </div>
        {activeTab === 'exercise' && sessionId && (
          <div className="session-info">
            <span className="session-id">Session: {sessionId}</span>
            {model && <span className="model-info">Model: {model}</span>}
            <button 
              className="new-session-btn" 
              onClick={() => {
                setSessionId(null)
                setModel(null)
                setChatKey(prev => prev + 1)
              }}
            >
              New Session
            </button>
          </div>
        )}
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
        <ExerciseChat 
          key={chatKey}
          sessionId={sessionId} 
          setSessionId={setSessionId}
          model={model}
          setModel={setModel}
          environment={selectedEnvironment}
        />
      )}
    </div>
  )
}

export default App
