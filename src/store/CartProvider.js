import { useReducer } from "react";

import CartContext from "./cart-context";

/*The defaultCartState object defines the initial state of the cart, which includes an empty array for items
and a totalAmount of 0 */
const defaultCartState = {
    items: [],
    totalAmount: 0
};


/*The cartReducer function is a function that takes two parameters: state and action, and returns a new state 
based on the given action. */
const cartReducer = (state, action) => {

    /*The function checks the type property of the action parameter to determine what action to take. 
    If the action type is ADD, the function will add a new item to the cart. It concatenates the new item to 
    the existing items in the state and calculates the new total amount. It returns a new state object that 
    includes the updated items and total amount. */
    if (action.type === "ADD") {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }


        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'CLEAR') {
        return defaultCartState;
    }


    /*If the action type is not recognized, the function returns the default cart state */
    return defaultCartState;
};

const CartProvider = props => {

    /*The useReducer hook is used to manage the state of the cart, and a cartReducer function is defined 
    to handle the state updates*/
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    /*The addItemToCartHandler function is called when an item is added to the cart, and it dispatches 
    an action with a type of "ADD" and the item object */
    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    /*The removeItemFromCartHandler function is called when an item is removed from the cart, and it dispatches
    an action with a type of "REMOVE" and the item id */
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    }

    /*The cartContext object is defined with the current state of the cart and the functions to handle adding
    and removing items from the cart */
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    /* The CartContext.Provider component is used to provide this context to the child components of the application. */
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;