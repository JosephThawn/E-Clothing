import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";


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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }

        default:
        throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}


 


export const CartProvider = ({children}) => {
//     const [isCartOpen, setIsCartOpen] = useState(false)
//     const [cartItems, setCartItems] = useState([])
//     const [cartCount, setCartCount] = useState(0)
//     const [cartTotal, setCartTotal] = useState(0)

const [ {cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)



//     useEffect(() => {
//         //every time [carItems] changes, recalculate the cart count.
//         const newCartCount = cartItems.reduce((total, cartItem) => total+cartItem.quantity, 0)
//         setCartCount(newCartCount)
//     }, [cartItems])

//     useEffect(() => {
//         const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
//         setCartTotal(newCartTotal)
//     }, [cartItems])


//updateing payload
    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        )

        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        )

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
             {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            })
            )

    }   


        /**
         generate newCartCount

         generate newCartTotal



         dispatch new action with payload = {
             newCartItems,
             newCartTotal,
             newCartCount
         }
         */
        



    const addItemToCart = (productToAdd) => {
       const newCartItems = addCartItem(cartItems, productToAdd)
       updateCartItemReducer(newCartItems)
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItems)

      };

      const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        )
    }

    const value = {
        isCartOpen, 
        setIsCartOpen,
        addItemToCart, 
        cartItems,cartCount, 
        removeItemToCart, 
        clearItemFromCart, 
        cartTotal
    };

   


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>

    )
        
   }