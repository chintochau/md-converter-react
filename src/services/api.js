const API_CONFIGS = {
  'production-v1.2': {
    baseUrl: 'http://node6898-env-8937861.ca-east.onfullhost.cloud:11008/api/v1.2',
    apiKey: 'wibbi-api-key'
  },
  'production-v1.3': {
    baseUrl: 'http://node6898-env-8937861.ca-east.onfullhost.cloud:11008/api/v1.3',
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

export const fetchExercisePlan = async (prompt, sessionId = null, environment = 'production-v1.2') => {
  const config = API_CONFIGS[environment] || API_CONFIGS['production-v1.2']
  try {
    const requestBody = { prompt };
    if (sessionId) {
      requestBody.session_id = sessionId;
    }
    
    console.log('Fetching exercise plan with:', {
      url: `${config.baseUrl}/exercises/chat`,
      prompt: prompt,
      session_id: sessionId,
      environment: environment,
      headers: {
        'x-api-key': config.apiKey
      }
    });
    
    const response = await fetch(`${config.baseUrl}/exercises/chat`, {
      method: 'POST',
      headers: {
        'x-api-key': config.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: `${config.baseUrl}/exercises/chat`
      })
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching exercise plan:', error)
    throw error
  }
}