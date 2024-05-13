import React from "react";
import { allPokemon } from "./AllPokemon";

export function SearchBar(props) {
    function searchForResults(string) {
        if(string){
            const filteredPokemon = allPokemon.filter(name => name.toLowerCase().includes(string.toLowerCase()));
            showSelectedPokemon(filteredPokemon)
        } else {
            showSelectedPokemon(null)
        }
    }

    function showSelectedPokemon(mons) {
        props.updateSelectedPokemon(mons)
    }

    return (
        <div>
            <input className="search-bar"  placeholder="Search for a Pokémon" onChange={(e) => searchForResults(e.target.value)}></input>
        </div>
    )

}
