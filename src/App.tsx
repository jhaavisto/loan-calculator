import { useState, useEffect } from 'react'
import classes from './App.module.css'
import InterestRateSelector from './components/InterestRateSelector';
import MonthlyPaymentDisplay from './components/MonthlyPaymentDisplay';

interface LoanDetails {
  principal: string;
  interestRate: string; // as a percentage
  margin: string; // as a percentage
  years: string;
}

function App() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    principal: '',
    interestRate: '',
    margin: '',
    years: '',
  });

  const [monthlyPayment, setMonthlyPayment] = useState<string>('');
  const [monthlyInterest, setMonthlyInterest] = useState<string>('');
  const [monthlyAmortization, setMonthlyAmortization] = useState<string>('');

  useEffect(() => {
    const calculateMonthlyPayment = (): void => {
      // Ensure that the input is properly formatted as a float
      const principal = loanDetails.principal ? parseFloat(loanDetails.principal.replace(',', '.')) : 0;
      const interestRate = loanDetails.interestRate ? parseFloat(loanDetails.interestRate.replace(',', '.')) : 0;
      const margin = loanDetails.margin ? parseFloat(loanDetails.margin.replace(',', '.')) : 0;
      const years = loanDetails.years ? parseFloat(loanDetails.years.replace(',', '.')) : 0;
      const fullInterestRate = interestRate + margin;
  
      if (principal > 0 && fullInterestRate > 0 && years > 0) {
        const monthlyInterestRate = (fullInterestRate / 100) / 12;
        const numberOfPayments = years * 12;
        const payment =
          principal *
          (monthlyInterestRate /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
  
        // Interest portion for the first month
        const initialInterestPayment = principal * monthlyInterestRate;
  
        // Principal portion for the first month
        const initialPrincipalPayment = payment - initialInterestPayment;
  
        setMonthlyPayment(payment.toFixed(2));
        setMonthlyInterest(initialInterestPayment.toFixed(2));
        setMonthlyAmortization(initialPrincipalPayment.toFixed(2));
      } else {
        setMonthlyPayment('');
        setMonthlyInterest('');
        setMonthlyAmortization('');
      }
    };

    calculateMonthlyPayment();
  }, [loanDetails]);

  const handleInterestRateChange = (newInterestRate: string) => {
    setLoanDetails({ ...loanDetails, interestRate: newInterestRate });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;

    setLoanDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Lainalaskuri</h1>
      <p>Sovellus laskee annuiteettilainan mukaiset kuukausittaiset koron ja vähennyksen osuudet sekä maksettavan summan. Lopullisen summan päälle tulee todennäköisesti vielä pankin palvelumaksu. Alla olevien painikkeiden avulla voit valita viimeisimmän arvon käyttämästäsi viitekorosta. Vaihtoehtoisesti voit syöttää viitekoron arvon itse. Syöttämiäsi tietoja ei tallenneta mihinkään.</p>
      <InterestRateSelector onRateChange={handleInterestRateChange} />
      <div className={classes.formContainer}>
        <label className={classes.label} htmlFor="principal">
          Lainasumma (€):
        </label>
        <input
          className={classes.input}
          type="text"
          inputMode="decimal"
          pattern="[0-9]*"
          name="principal"
          id="principal"
          value={loanDetails.principal}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formContainer}>
        <label className={classes.label} htmlFor="interestRate">
          Viitekorko (%):
        </label>
        <input
          className={classes.input}
          type="text"
          inputMode="decimal"
          pattern="\d*([.,]\d+)?"
          name="interestRate"
          id="interestRate"
          value={loanDetails.interestRate}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formContainer}>
        <label className={classes.label} htmlFor="margin">
          Marginaali (%):
        </label>
        <input
          className={classes.input}
          type="text"
          inputMode="decimal"
          pattern="\d*([.,]\d+)?"
          name="margin"
          id="margin"
          value={loanDetails.margin}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formContainer}>
        <label className={classes.label} htmlFor="years">
          Laina-aika vuosissa:
        </label>
        <input
          className={classes.input}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          name="years"
          id="years"
          value={loanDetails.years}
          onChange={handleInputChange}
        />
      </div>
      <MonthlyPaymentDisplay
        monthlyPayment={monthlyPayment}
        monthlyInterest={monthlyInterest}
        monthlyAmortization={monthlyAmortization} />
    </div>
  )
}

export default App
