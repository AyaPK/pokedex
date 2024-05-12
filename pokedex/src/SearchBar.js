import React, { useState } from "react";
import { allPokemon } from "./AllPokemon";

export function SearchBar(props) {
  const [searchName, setSearchName] = useState([])

  function searchForResults(string) {
    if(string){
      const filteredPokemon = allPokemon.filter(name => name.toLowerCase().includes(string));
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
