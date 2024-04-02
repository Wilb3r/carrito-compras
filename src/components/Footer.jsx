import { useFilters } from "../hooks/useFilter"
import "./Footer.css"
import { useCart } from "../hooks/useCart";

export function Footer() {
    const { filters } = useFilters();
    const { cart } = useCart();
    return (
        <footer className="footer">
            <h4><span>Wilber Perdomo</span></h4>
            <h5>©The Black Market ☺</h5>
        </footer>
    )
}