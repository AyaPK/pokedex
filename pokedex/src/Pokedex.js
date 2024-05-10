import React, { useState } from "react";
import { PokemonType } from "./PokemonType";

export function Pokedex() {
  const pokemonToShow = ["Bulbasaur", "Squirtle", "Charmander", "Pikachu", "Butterfree", "Articuno", "Sigilyph"]
  const [selectedPokemon, setSelectedPokemon] = useState(undefined);

  async function getPokemonInfo(name) {
    const URL = "https://pokeapi.co/api/v2/pokemon/"+name.toLowerCase()

    const response = await fetch(URL);
    const data = await response.json();

    console.log(data)

    setSelectedPokemon(data);
  }

  return (
    <div>
      {selectedPokemon && (
        <div>
          {selectedPokemon.species.name}
            <br/>
          {
            selectedPokemon.types.map(type => (
              <PokemonType type={type.type.name} />
            ))
          }    

          <img src={selectedPokemon.sprites.front_default}></img>      
        </div>
      )}

      <p>Select Pokemon:</p>

      {
        pokemonToShow.map(p => (
          <button onClick={() => getPokemonInfo(p)}>{p}</button>
        ))
      }

      
    </div>
  );
}
