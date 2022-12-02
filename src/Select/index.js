import { useState } from "react";
import "./style.css";

const Select = ({ currencies }) => {
    const [currency, setCurrency] = useState(currencies[0].symbol);

    return (
        <select
            className="form__select"
            name=""
            value={currency}
            onChange={({ target }) => setCurrency(target.value)}
        >
            {currencies.map((currency=>(
                <option
                    key={currency.symbol}
                    value={currency.symbol}>
                    {currency.symbol}
                </option>
            )))};
        </select>

    );
};

export default Select;