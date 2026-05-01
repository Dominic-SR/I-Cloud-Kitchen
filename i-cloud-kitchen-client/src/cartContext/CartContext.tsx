import {createContext,useContext} from "react";

const CartContext = createContext({});

export const CartProvider = ({children}: {children: any}) => {
    return (
    <CartContext.Provider value={{}}>
        {children}
    </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext);
}