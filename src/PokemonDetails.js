import React from "react";
import { PokemonDetail } from "./pokemonDetail";

export function PokemonDetails(props) {
    const pokemon = props.selectedPokemon;

    return (
        <div>
            <div className="pokemon-details">
                <PokemonDetail statistic={"height"} value={pokemon.height/10} unit={"m"} />
                <PokemonDetail statistic={"weight"} value={pokemon.weight/10} unit={"kg"} />
            </div>
        </div>
    )
}
