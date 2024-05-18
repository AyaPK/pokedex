import React from "react";
import { PokemonDetail } from "./pokemonDetail";

export function PokemonDetails(props) {
    const pokemon = props.selectedPokemon;
    const species = props.selectedSpecies;

    return (
        <div>
            <div className="pokemon-details">
                <PokemonDetail statistic={"height"} value={pokemon.height/10} unit={"m"} />
                <PokemonDetail statistic={"weight"} value={pokemon.weight/10} unit={"kg"} />
                <PokemonDetail statistic={"capture rate"} value={species.capture_rate} />
                <PokemonDetail statistic={"shape"} value={species.shape?.name ?? "unknown"} />
                
                {species.egg_groups.map((group, index) => (
                    <PokemonDetail key={group.name} statistic={"egg group "+(index+1)} value={group.name} />
                ))}
            </div>
        </div>
    )
}
