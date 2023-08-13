import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
    // using useContext hook to access the CartContext object
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;


    /*The component defines a local function called "addItemToCartHandler" that will be called 
    when the user clicks the "Add to Cart" button in the MealItemForm component. 
    This function adds the current meal item to the cart by calling the "addItem" method 
    on the CartContext object*/

    const addItemToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };
    /*the component returns a list item (li) element with two child div elements. The first div element displays
    the name, description, and price of the meal item. The second div element contains the MealItemForm component
    with the "onAddToCart" event handler passed as a prop.*/
    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addItemToCartHandler} id={props.id} />
        </div>
    </li>
};

export default MealItem;