import './ExerciseList.css'

function ExerciseList({ exercises }) {
  const getDifficultyLabel = (level) => {
    const labels = {
      1: 'Beginner',
      2: 'Intermediate',
      3: 'Advanced'
    }
    return labels[level] || 'Unknown'
  }

  const getDifficultyClass = (level) => {
    const classes = {
      1: 'beginner',
      2: 'intermediate',
      3: 'advanced'
    }
    return classes[level] || ''
  }

  return (
    <div className="exercise-list">
      <h3>Exercise Details ({exercises.length} exercises)</h3>
      
      <div className="exercises-grid">
        {exercises.map((item, index) => (
          <div key={`${item.id}-${index}`} className="exercise-card">
            <div className="exercise-header">
              <h4>{item.exercise.name}</h4>
              <span className={`difficulty ${getDifficultyClass(item.difficulty_level)}`}>
                {getDifficultyLabel(item.difficulty_level)}
              </span>
            </div>
            
            {item.photos?.thumbnail && (
              <img 
                src={item.photos.thumbnail} 
                alt={item.exercise.name}
                className="exercise-thumbnail"
              />
            )}
            
            <p className="exercise-description">{item.exercise.description}</p>
            
            <div className="exercise-details">
              <h5>Instructions:</h5>
              <p className="instructions">{item.exercise.instruction}</p>
              
              {item.exercise.treatment_goals && item.exercise.treatment_goals.length > 0 && (
                <div className="treatment-goals">
                  <h5>Benefits:</h5>
                  <ul>
                    {item.exercise.treatment_goals.slice(0, 3).map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {item.exercise.contraindications && item.exercise.contraindications.length > 0 && (
                <div className="contraindications">
                  <h5>Cautions:</h5>
                  <ul>
                    {item.exercise.contraindications.slice(0, 2).map((caution, i) => (
                      <li key={i}>{caution}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExerciseList