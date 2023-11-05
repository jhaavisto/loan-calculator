export const fetchEuribor = async (): Promise<Euribor> => {
    const url = 'https://api.api-ninjas.com/v1/interestrate?name=euribor'
    const apiKey = import.meta.env.VITE_EURIBOR_API_KEY;
    const options = {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey || '',
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = JSON.parse(await response.text());
      return {
        rates: {
          '1month': result['non_central_bank_rates'][1]['rate_pct'] as number,
          '3months': result['non_central_bank_rates'][2]['rate_pct'] as number,
          '6months': result['non_central_bank_rates'][3]['rate_pct'] as number,
          '12months': result['non_central_bank_rates'][4]['rate_pct'] as number,
        },
        'lastUpdated': result['non_central_bank_rates'][0]['last_updated'] as string,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }