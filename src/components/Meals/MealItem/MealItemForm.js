import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    /* using useState hook to manage the validation of the entered amount.*/
    const [amountIsValid, setAmountIsValid] = useState(true);
    /* using the useRef hook to create a reference to the input element for the amount of meal items to be added to the cart.*/
    const amountInputRef = useRef();

    /*The component defines a local function called "submitHandler" that will be called when the user submits 
    the form (i.e., clicks the "Add" button). This function reads the entered amount from the input element, 
    validates it, and calls the "onAddToCart" event handler passed as a prop */
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };

    /* the component returns a form element with an Input component and a button element as its children.
    The Input component is used to display a label and an input element for the amount of meal items to be added
    to the cart. The button element is used to submit the form. If the entered amount is invalid,
    the component displays an error message*/
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef}
            label="Amount"
            input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}
        />
        <button> + Add</button>
        {!amountIsValid && <p>Please eneter a valid amount (1-5)</p>}
    </form>
};

export default MealItemForm;