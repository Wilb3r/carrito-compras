import "./Footer.css"

export function Footer( {filters} ) {
    return (
        <footer className="footer">
            {
                JSON.stringify(filters, null, 2)
            }
            {/* <h4><span>Wilber Perdomo</span></h4>
            <h5>©The Black Market ☺</h5> */}
        </footer>
    )
}