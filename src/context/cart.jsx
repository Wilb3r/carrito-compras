import { createContext, useReducer } from "react";

//1. Crear el contexto
export const CartContext = createContext();

//Modiicar el estado inicial para guardar el del local storage, lo que hay en el carrito
const initialState = JSON.parse(window.localStorage.getItem('cart')) || [];

//Actualizar el local storage con el state para el carrito
export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload} = action;

    switch (actionType){
        case 'ADD_TO_CART': {
            const { id } = actionPayload;
            //verifica si el producto esta en el carrito
            const productInCartIndex = state.findIndex( item => item.id === id); 

            //si si esta en el carrito
            if (productInCartIndex >= 0){
                const newState = structuredClone(state);

                newState[productInCartIndex].quantity += 1;
                updateLocalStorage(newState);
                return newState;
            }

            //si el producto no esta en el carrito
            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]

            updateLocalStorage(newState);
            return newState;
        }
        case 'REST_TO_CART': {
            const { id } = actionPayload;
            //verifica si el producto esta en el carrito
            const productInCartIndex = state.findIndex( item => item.id === id); 

            //si si esta en el carrito
            if (productInCartIndex >= 0){
                const newState = structuredClone(state);
                newState[productInCartIndex].quantity -= 1;
                updateLocalStorage(newState);
                return newState;
            }

            //si el producto no esta en el carrito
            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]

            updateLocalStorage(newState);
            return newState;
        }
        case 'REMOVE_FROM_CART':{
            const { id } = actionPayload;
            const newState = state.filter(item => item.id != id);
            updateLocalStorage(newState);
            return newState;
        }

        case 'CLEAR_CART':{
            const initialState = [];
            updateLocalStorage(initialState);
            return initialState; //se hace un reset
        }
    }
    return state;
}

//Crear el proveedor
export function CartProvider ({ children }) {
    const [ state, dispatch ] = useReducer(reducer, initialState); 

    const addToCart = product => dispatch ({
        type: 'ADD_TO_CART',
        payload: product
    })

    const restToCart = product => dispatch ({
        type: 'REST_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch ({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = ()  => dispatch 
    ({ type: 'CLEAR_CART'})

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            restToCart,
            removeFromCart,
            clearCart
        }}>
            { children }
        </CartContext.Provider>
    )
}