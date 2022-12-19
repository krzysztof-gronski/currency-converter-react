import { StyledSelect } from "./styled";

const Select = ({ currencies, currency, setCurrency, calculateResult, disabled }) => {

    return (
        <StyledSelect
            name=""
            value={currency}
            onChange={({ target }) => {
                setCurrency(target.value);
                calculateResult(target.value);
            }}
            disabled={disabled}
        >
            {currencies.map((currency => (
                <option
                    key={currency}
                    value={currency}>
                    {currency}
                </option>
            )))};
        </StyledSelect>
    );
};

export default Select;