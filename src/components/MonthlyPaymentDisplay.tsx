import classes from './MonthlyPaymentDisplay.module.css';

interface Props {
  monthlyPayment: string;
  monthlyInterest: string;
  monthlyAmortization: string;
}

const MonthlyPaymentDisplay = ({ monthlyPayment, monthlyInterest, monthlyAmortization }: Props) => {
  return (
    <>
      {monthlyPayment !== '' && (
        <>
          <div className={classes.paymentInfo} aria-live="polite">
            <p>Lainanlyhennys: {monthlyAmortization} €</p>
            <p>Korko: {monthlyInterest} €</p>
            <p>Kuukausittainen maksu: {monthlyPayment} €</p>
          </div>
          <div className={classes.progressWrapper}>
            <div className={classes.progress} style={{ width: `${((+monthlyInterest / +monthlyPayment)) * 100}%` }}>
              <small>Koron osuus: {(((+monthlyInterest / +monthlyPayment)) * 100).toFixed(0)}%</small>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MonthlyPaymentDisplay;