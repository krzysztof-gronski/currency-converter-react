import React, { useState } from "react";
import Main from "./Main";
import Form from "./Form";
import Header from "./Header";
import Footer from "./Footer";
import { currencies, rates } from "./currencies";


function App() {
  //const [result, setResult] = useState();
  const calculateResult = (currencyFrom, currencyTo, amountFrom) => {
    const selectedPair = currencyFrom + currencyTo;
    const rate = rates.find(({ pair }) => pair === selectedPair).rate;
    const amountTo = amountFrom*rate;
    alert(`${amountFrom} * ${rate} ${currencyFrom}${currencyTo}`)
    return amountTo;
  };

  return (
    <React.Fragment>
      <Header />
      <Main>
        <Form currencies={currencies} rates={rates} calculateResult={calculateResult}>
        </Form>
      </Main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
