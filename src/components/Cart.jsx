import "./Cart.css";
import React, { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from "../hooks/useCart";

function CartItem({ thumbnail, title, price, quantity, addToCart, restToCart }) {
    return (
        <li>
        <img src={ thumbnail } alt= {title} />
        <div>
            <strong> { title }</strong> - ${price}
        </div>

        <footer>
            <button onClick={restToCart} 
            disabled={quantity <= 0}>-</button>
            <small>Qty: {quantity}</small>
            <button onClick={addToCart}>+</button>
        </footer>
    </li>
    );
}

export function Cart () {
   const cartCheckboxId = useId();

   const { cart, clearCart, addToCart, restToCart } = useCart();

    const totalProduct = cart.reduce((total, product) => total + product.quantity, 0);
    const totalPago = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    return(
        <>
        <label className="cart-button" htmlFor={ cartCheckboxId}>
            <CartIcon />
        </label>
        <input id={ cartCheckboxId } type="checkbox" hidden />
        <aside className="cart">
            <ul>
                {
                cart.map(product => (
                    <CartItem 
                    key={ product.id }
                    addToCart={ () => addToCart(product)}
                    restToCart={ () => restToCart(product)}
                    { ...product}
                    />
                ))
            }
            </ul>
            <p>Productos: {totalProduct}</p>
            <p>Total a pagar: ${totalPago}</p>
            <button style={{backgroundColor: "red"}} onClick={clearCart}>
                <ClearCartIcon />
            </button>
        </aside>

        </>
    );
}