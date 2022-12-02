import {useState} from "react";
import "./style.css";

const Input = () => {
    const [amount,setAmount] = useState("0.00");
    return(  
        <input 
        className="form__input" 
        name="" 
        type="number" 
        value={amount}
        onChange={({target})=>setAmount(target.value)}
        min="0" 
        step="0.01"
        />
    );
};

export default Input;