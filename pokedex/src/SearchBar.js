import React, { useState } from "react";
import { allPokemon } from "./AllPokemon";

export function SearchBar(props) {
    const [searchName, setSearchName] = useState([])

    function searchForResults(string) {

        console.log(string)

        if(string){
            const filteredPokemon = allPokemon.filter(name => name.toLowerCase().includes(string));
            showSelectedPokemon(filteredPokemon)
        } else {
            setSearchName([])
        }
    }

    function showSelectedPokemon(mons) {
        props.updateSelectedPokemon(mons)
    }

    return (
        <div>
            <input className="search-bar" onChange={(e) => searchForResults(e.target.value)}></input>
                {/* {searchName.map(name => (
                    <p>{name}</p>
                ))} */}
        </div>
    )

}
