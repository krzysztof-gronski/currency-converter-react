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
    const downloadStatus = useCurrenciesData();
    const renderData = {
        currenciesSymbols: downloadStatus === "resolved" ? JSON.parse(localStorage.getItem("currenciesSymbols")) : [],
        disableInputData: downloadStatus === "resolved" ? false : true,
        message: downloadStatus === "resolved"
            ? `ECB foreign exchange rates updated at ${shortFormatDate(new Date(localStorage.getItem("updateDate")))}`
            : (downloadStatus === "rejected"
                ? "Loading error. Check internet connection!"
                : "Loading "),
        displaySpinner: downloadStatus === "loading" ? true : false,
    };

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
                <StyledSection as="legend">INSTANT CURRENCY CONVERTER</StyledSection>
                <Panel
                    body={
                        <React.Fragment>
                            <Input amount={amountFrom} setAmount={setAmountFrom} validate={validate} calculateResult={calculateFromTo} disabled={renderData.disableInputData} />
                            <Select currencies={renderData.currenciesSymbols} currency={currencyFrom} setCurrency={setCurrencyFrom} calculateResult={calculateFromToSelect} disabled={renderData.disableInputData} />
                        </React.Fragment>
                    }
                />
                <Panel
                    body={
                        <React.Fragment>
                            <Input amount={amountTo} setAmount={setAmountTo} validate={validate} calculateResult={calculateToFrom} disabled={renderData.disableInputData} />
                            <Select currencies={renderData.currenciesSymbols} currency={currencyTo} setCurrency={setCurrencyTo} calculateResult={calculateToFromSelect} disabled={renderData.disableInputData} />
                        </React.Fragment>
                    }
                />
            </StyledFieldset>
            <StyledSection bottom>{renderData.message}<StyledSpinner display={renderData.displaySpinner}></StyledSpinner></StyledSection>
        </StyledForm>
    );
};

export default Form;