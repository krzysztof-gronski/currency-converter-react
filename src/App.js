import React from "react";
import Main from "./Main";
import Form from "./Form";
import Time from "./Time";
import Footer from "./Footer";
import { currencies, rates } from "./currencies";


function App() {
  const calculateResult = (currencyFrom, currencyTo, amountFrom) => {
    const selectedPair = currencyFrom + currencyTo;
    const rate = rates.find(({ pair }) => pair === selectedPair).rate;
    const amountTo = (amountFrom * rate).toFixed(2);
    return amountTo;
  };

  return (
    <React.Fragment>

      <Main>
        <Time />
        <Form currencies={currencies} rates={rates} calculateResult={calculateResult}>
        </Form>
      </Main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
