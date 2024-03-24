import { Filters } from "./Filters"

export function Header( {changeFilters}){
    return(
        <header>
            <h1>Online Store</h1>
            <Filters onChange={ changeFilters}/>
        </header>
    )
}