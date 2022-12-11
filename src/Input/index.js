import { StyledInput } from "./styled";

const Input = ({ amount, setAmount, validate, calculateResult }) => {
    return (
        <StyledInput
            name=""
            type="number"
            value={amount}
            onChange={({ target }) => {
                setAmount(validate(target.value, amount));
                calculateResult(target.value);
            }}
            min="0"
            step="0.01"
        />
    );
};

export default Input;