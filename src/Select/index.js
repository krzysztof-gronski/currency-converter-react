import "./style.css";

const Select = ({ currencies, currency, setCurrency, calculateResult }) => {

    return (
        <select
            className="form__select"
            name=""
            value={currency}
            onChange={({ target }) => {
                setCurrency(target.value);
                calculateResult(target.value);
            }}
        >
            {currencies.map((currency => (
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