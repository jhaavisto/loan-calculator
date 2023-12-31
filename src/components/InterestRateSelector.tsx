import { useEffect, useState } from 'react'
import { fetchEuribor } from '../api';
import classes from './InterestRateSelector.module.css'

interface Props {
  onRateChange: (rate: string) => void;
}

const InterestRateSelector = ({ onRateChange }: Props) => {
  const [rates, setRates] = useState<Euribor>({ rates: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const fetchedRates = await fetchEuribor();
        setRates(fetchedRates);
      } catch (error) {
        setHasError(true);
        console.error('There was a problem fetching the Euribor rates: ', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const rateSelects: Array<keyof EuriborRates> = ['3months', '6months', '12months'];
  const rateSelectText = ['3', '6', '12'];

  return (
    <>
      {isLoading ? (
        <p>Ladataan viitekorkoja...</p>
      ) : (
        <>
          {hasError && <p>Viitekorkoja ei voitu ladata.</p>}
          {!hasError && (
            <>
              <span>Käytä viitekorkoa:</span>
              <div className={classes.buttonGroup}>
                {rateSelects.map((rate, index) => (
                  <button className={classes.button} key={rate} onClick={() => onRateChange(rates.rates[rate]?.toFixed(2) || '')}>
                    Euribor {rateSelectText[index]}kk {rates.rates[rate]?.toFixed(2) + '%' || ''}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
export default InterestRateSelector

