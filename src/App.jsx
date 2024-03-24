import React, { useState } from "react"
import { Products } from "./components/Products"
import { products as initialProducts } from "./mocks/products.json"
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { IS_DEELOPMENT } from "./config.js";

//Crear un custum hook, para separar la logica con la que se desarrollan los filtros
function useFilters() {
  
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  });

  const filterProducts = (products) => {
    return products.filter(product => {
      return(
        product.price >= filters.minPrice && (
          filters.category === 'all' || 
          product.category === filters.category
        )
      )
    })
  }
  return { filters, filterProducts, setFilters}

}

function App() {
  const [products] = useState(initialProducts);

  const { filters, filterProducts, setFilters } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <>
    <Header changeFilters={setFilters}/>
     <Products products={filteredProducts}/>
     <Footer filters ={ filters }/>
     {  IS_DEELOPMENT &&  <Footer filters={ filters } />}
    </>
  )
}

export default App
