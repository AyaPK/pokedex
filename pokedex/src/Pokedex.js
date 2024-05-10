import React, { useState, useEffect } from "react";
import { PokemonType } from "./PokemonType";

export function Pokedex(props) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(props.name)

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
        const data = await response.json();
        setSelectedPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }

    fetchData();
  }, [props.name]);

  return (
    <div>
      {selectedPokemon && (
        <div>
          {selectedPokemon.species.name}
          <br />
          {selectedPokemon.types.map((type) => (
            <PokemonType key={type.type.name} type={type.type.name} />
          ))}
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.species.name} />
        </div>
      )}
    </div>
  );
}
