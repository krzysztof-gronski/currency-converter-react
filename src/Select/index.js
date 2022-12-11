import { StyledSelect } from "./styled";

const Select = ({ currencies, currency, setCurrency, calculateResult }) => {

    return (
        <StyledSelect
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
        </StyledSelect>
    );
};

export default Select;