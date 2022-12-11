import React, { useState } from "react";
import Select from "../Select";
import Input from "../Input";
import Panel from "../Panel";
import {StyledForm, StyledFieldset, StyledLegend} from "./styled.js";

const Form = ({ currencies, rates, calculateResult }) => {
    const [currencyFrom, setCurrencyFrom] = useState(currencies[0].symbol);
    const [currencyTo, setCurrencyTo] = useState(currencies[1].symbol);
    const [amountFrom, setAmountFrom] = useState("0.00");
    const [amountTo, setAmountTo] = useState("0.00");

    const calculateFromTo = (amountFromTemp) => {
        setAmountTo(calculateResult(currencyFrom, currencyTo, amountFromTemp));
    };

    const calculateToFrom = (amountFromTemp) => {
        setAmountFrom(calculateResult(currencyTo, currencyFrom, amountFromTemp));
    };

    const calculateFromToSelect = (currencyFromTemp) => {
        setAmountTo(calculateResult(currencyFromTemp, currencyTo, amountFrom));
    };

    const calculateToFromSelect = (currencyFromTemp) => {
        setAmountFrom(calculateResult(currencyFromTemp, currencyFrom, amountTo));
    };

    const validate = (newAmount, amountFrom) => {
        if ((newAmount === "") && (amountFrom !== 0)) {
            newAmount = 0;

        }
        if (newAmount < 0) {
            newAmount = 0;
        }
        if (newAmount > 0) {

            if ((newAmount.includes(".")) && (newAmount.indexOf(".") < newAmount.length - 3)) {
                newAmount = amountFrom;
            }
        }
        return !!newAmount ? parseFloat(newAmount) : "";
    };



    return (
        <StyledForm>
            <StyledFieldset>
                <StyledLegend>INSTANT CURRENCY CONVERTER</StyledLegend>
                <Panel
                    body={
                        <React.Fragment>
                            <Input amount={amountFrom} setAmount={setAmountFrom} validate={validate} calculateResult={calculateFromTo} />
                            <Select currencies={currencies} currency={currencyFrom} setCurrency={setCurrencyFrom} calculateResult={calculateFromToSelect} />
                        </React.Fragment>
                    }
                />
                <Panel
                    body={
                        <React.Fragment>
                            <Input amount={amountTo} setAmount={setAmountTo} validate={validate} calculateResult={calculateToFrom} />
                            <Select currencies={currencies} currency={currencyTo} setCurrency={setCurrencyTo} calculateResult={calculateToFromSelect} />
                        </React.Fragment>
                    }
                />
            </StyledFieldset>
        </StyledForm>
    );
};

export default Form;