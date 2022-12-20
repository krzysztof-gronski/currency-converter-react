import React, { useState } from "react";
import Select from "../Select";
import Input from "../Input";
import Panel from "../Panel";
import { StyledForm, StyledFieldset, StyledSection, StyledSpinner } from "./styled.js";
import { useCurrenciesData } from "../CurrenciesData/index";
import { shortFormatDate } from "../Time/index";

const Form = ({ calculateResult }) => {
    const [currencyFrom, setCurrencyFrom] = useState("EUR");
    const [currencyTo, setCurrencyTo] = useState("USD");
    const [amountFrom, setAmountFrom] = useState("0.00");
    const [amountTo, setAmountTo] = useState("0.00");
    let disableInputData=true;
    const downloadStatus = useCurrenciesData();
    let currenciesSymbols, message, displaySpinner;

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

    if (downloadStatus === "resolved") {
        currenciesSymbols = JSON.parse(localStorage.getItem("currenciesSymbols"));
        disableInputData=false;
        const updateDate = new Date();
        message=`ECB foreign exchange rates updated at ${shortFormatDate(updateDate)}`;
        displaySpinner=false;
    }
    else if (downloadStatus === "rejected") {
        currenciesSymbols = [];
        disableInputData=true;
        message="Loading error. Check internet connection!";
        displaySpinner=false;
    }
    else {
        currenciesSymbols = [];
        disableInputData=true;
        message="Loading ";
        displaySpinner=true;
    }

    return (
        <StyledForm>
            <StyledFieldset>
                <StyledSection as="legend">INSTANT CURRENCY CONVERTER</StyledSection>
                <Panel
                    body={
                        <React.Fragment>
                            <Input amount={amountFrom} setAmount={setAmountFrom} validate={validate} calculateResult={calculateFromTo} disabled={disableInputData}/>
                            <Select currencies={currenciesSymbols} currency={currencyFrom} setCurrency={setCurrencyFrom} calculateResult={calculateFromToSelect} disabled={disableInputData}/>
                        </React.Fragment>
                    }
                />
                <Panel
                    body={
                        <React.Fragment>
                            <Input amount={amountTo} setAmount={setAmountTo} validate={validate} calculateResult={calculateToFrom} disabled={disableInputData}/>
                            <Select currencies={currenciesSymbols} currency={currencyTo} setCurrency={setCurrencyTo} calculateResult={calculateToFromSelect} disabled={disableInputData}/>
                        </React.Fragment>
                    }
                />
                
            </StyledFieldset>
            <StyledSection bottom>{message}<StyledSpinner display={displaySpinner}></StyledSpinner></StyledSection>
        </StyledForm>
        
    );

};

export default Form;