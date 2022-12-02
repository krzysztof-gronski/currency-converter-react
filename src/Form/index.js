import "./style.css";

const Form = ({ children }) => (
    <form className="form js-form">
        <fieldset className="form__fieldset">
            <legend className="form__legend js-legend">INSTANT CURRENCY CONVERTER</legend>
            {children}
        </fieldset>
    </form>
);

export default Form;