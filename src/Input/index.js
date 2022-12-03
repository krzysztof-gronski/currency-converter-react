import "./style.css";

const Input = ({amount, setAmount, calculateResult}) => {
    return(  
        <input 
        className="form__input" 
        name="" 
        type="number" 
        value={amount}
        onChange={({target})=>{
            setAmount(target.value);
            alert(target.value);
            calculateResult(target.value);
        }}
        min="0" 
        step="0.01"
        />
    );
};

export default Input;