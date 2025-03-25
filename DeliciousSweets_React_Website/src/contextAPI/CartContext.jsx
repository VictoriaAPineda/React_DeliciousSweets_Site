import { useEffect, useState } from "react";
import { createContext } from "react";

export const Cart = createContext();

const CartContext = ({children}) =>{
    // Get items in localStorge if any 
    const [cart, setCart] = useState(()=>{
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });
    // const clearCart = () => {
    //     setCart([]);
    // }
    // Set items in cart to localstrorage to prevent loss of data unpon,
    // cartpage refresh. * Items will be wiped upon final cart submission
    useEffect(()=>{
        localStorage.setItem('cartItems', JSON.stringify(cart))
    }, [cart])

    return <Cart.Provider value = {{cart, setCart}}>
                {children}
            </Cart.Provider>
}
export default CartContext;