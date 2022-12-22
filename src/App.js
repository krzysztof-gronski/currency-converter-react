import React from "react";
import Main from "./Main";
import Form from "./Form";
import Time from "./Time";
import Footer from "./Footer";

function App() {
  const calculateRate = (currencyFrom, currencyTo) => {
    const currenciesData = JSON.parse(localStorage.getItem("currenciesData"));
    const currencyData = currenciesData.find(({ base }) => base === currencyFrom);
    return currencyData.rates[currencyTo];
  };

  const calculateResult = (currencyFrom, currencyTo, amountFrom) => {
    const rate = calculateRate(currencyFrom, currencyTo);
    const amountTo = (amountFrom * rate).toFixed(2);
    return amountTo;
  };

  return (
    <>
      <Main>
        <Time />
        <Form calculateResult={calculateResult}>
        </Form>
      </Main>
      <Footer />
    </>
  );
}

export default App;
