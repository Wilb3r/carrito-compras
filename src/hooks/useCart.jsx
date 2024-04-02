import { useContext } from "react";
import { CartContext } from "../context/cart";

//Creamos nuetra Custum Hook
export const useCart = () => {
    const context = useContext(CartContext);

    if (context === undefined){
        throw new Error("useCart debe ser usado dentro de un cartProvider ")
    }
    return context;
} 