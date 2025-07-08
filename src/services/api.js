const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1.2'
const API_KEY = import.meta.env.VITE_API_KEY || 'wibbi-api-key'

export const fetchExercisePlan = async (prompt) => {
  try {
    console.log('Fetching exercise plan with:', {
      url: `${API_BASE_URL}/exercises/chat`,
      prompt: prompt
    });
    
    const response = await fetch(`${API_BASE_URL}/exercises/chat`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching exercise plan:', error)
    throw error
  }
}