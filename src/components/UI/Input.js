import React from 'react';
import classes from './Input.module.css';


/*The Input component is created using React.forwardRef(), which allows the component to pass a ref attribute 
to its underlying input element. */
const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default Input;