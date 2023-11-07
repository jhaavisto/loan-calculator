export const fetchEuribor = async (): Promise<Euribor> => {
  const url = 'https://euribor.p.rapidapi.com/all'
  const apiKey = import.meta.env.VITE_EURIBOR_API_KEY;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey || '',
      'X-RapidAPI-Host': 'euribor.p.rapidapi.com',
    }
  };

  try {
    const response = await fetch(url, options);
    const result = JSON.parse(await response.text());
    return {
      rates: result,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}