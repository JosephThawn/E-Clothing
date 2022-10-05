import { createContext, useEffect, useState } from "react";
// import { ProductsContext } from "./peoducts.context";

//this is helper function
const addCartItem = (cartItems, productToAdd) => {
    //find if carditems contains productToAdd
    const existingCartIem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    //if found, increment quantity
    if(existingCartIem){
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
            )
    }
    //return new array with modified cartItems. new cart item
    return[...cartItems, {...productToAdd, quantity: 1}]

}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    )
    //check if quantity is eaul to 1, if its remove that item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    //return back cartitems with matching cart item with redced quantity.
    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id ? 
    {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
    )

}


const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)


    useEffect(() => {
        //every time [carItems] changes, recalculate the cart count.
        const newCartCount = cartItems.reduce((total, cartItem) => total+cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])





    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
      };


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems,cartCount, removeItemToCart, clearItemFromCart, cartTotal}


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
        
}