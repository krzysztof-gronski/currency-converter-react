import React, { useState } from "react";
import Select from "../Select";
import Input from "../Input";
import Panel from "../Panel";
import {StyledForm, StyledFieldset, StyledLegend} from "./styled.js";
import {useCurrenciesData} from "../CurrenciesData/index";

const Form = ({ currencies, rates, calculateResult }) => {
    const [currencyFrom, setCurrencyFrom] = useState("EUR");
    const [currencyTo, setCurrencyTo] = useState("USD");
    const [amountFrom, setAmountFrom] = useState("0.00");
    const [amountTo, setAmountTo] = useState("0.00");
    const downloadStatus = useCurrenciesData();

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

    if(downloadStatus==="resolved"){
        return (
            <StyledForm>
                <StyledFieldset>
                    <StyledLegend>INSTANT CURRENCY CONVERTER</StyledLegend>
                    <Panel
                        body={
                            <React.Fragment>
                                <Input amount={amountFrom} setAmount={setAmountFrom} validate={validate} calculateResult={calculateFromTo} />
                                <Select currencies={JSON.parse(localStorage.getItem("currenciesSymbols"))} currency={currencyFrom} setCurrency={setCurrencyFrom} calculateResult={calculateFromToSelect} />
                            </React.Fragment>
                        }
                    />
                    <Panel
                        body={
                            <React.Fragment>
                                <Input amount={amountTo} setAmount={setAmountTo} validate={validate} calculateResult={calculateToFrom} />
                                <Select currencies={JSON.parse(localStorage.getItem("currenciesSymbols"))} currency={currencyTo} setCurrency={setCurrencyTo} calculateResult={calculateToFromSelect} />
                            </React.Fragment>
                        }
                    />
                </StyledFieldset>
            </StyledForm>
        );
    }
    else if(downloadStatus==="rejected"){
        alert("Network error");
    }
    else{
        alert("Loading...");
    }
};

export default Form;