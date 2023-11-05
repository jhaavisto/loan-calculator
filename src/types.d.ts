interface EuriborRates {
    "1month"?: number;
    "3months"?: number;
    "6months"?: number;
    "12months"?: number;
  }
  
  interface Euribor {
    rates: EuriborRates;
    "lastUpdated"?: string;
  }