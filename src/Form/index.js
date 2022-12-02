import React,{ useState } from "react";
import "./style.css";
import Select from "../Select";
import Input from "../Input";
import Panel from "../Panel";

const Form = ({currencies, rates}) => {
    const [currencyFrom, setCurrencyFrom] = useState();
    const [currencyTo, setCurrencyTo] = useState();
    const [amountFrom, setAmountFrom] = useState();
    const [amountTo, setAmountTo] = useState();

    return (
        <form className="form js-form">
            <fieldset className="form__fieldset">
                <legend className="form__legend js-legend">INSTANT CURRENCY CONVERTER</legend>
                <Panel
                    body={
                        <React.Fragment>
                            <Input />
                            <Select currencies={currencies}/>
                        </React.Fragment>
                    }
                />
                <Panel
                    body={
                        <React.Fragment>
                            <Input />
                            <Select currencies={currencies}/>
                        </React.Fragment>
                    }
                />
            </fieldset>
        </form>
    );
};

export default Form;