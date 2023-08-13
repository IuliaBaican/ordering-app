import React from "react";


/*The CartContext object contains an initial state object with three properties.
When a component consumes the CartContext object, it will use this initial state. However, this state can
be modified by using a CartContext.Provider component that wraps the consuming component(s) and passes down 
updated values for the items and totalAmount properties, as well as new functions for addItem and removeItem */
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
});


export default CartContext;