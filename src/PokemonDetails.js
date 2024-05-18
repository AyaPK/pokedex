import React from "react";

export function PokemonDetails(props) {
    const pokemon = props.selectedPokemon;

    return (
        <div>
            <div className="pokemon-details">
                <div className="detail">
                    <p className="statistic">Height:</p>
                    <p className="value">{pokemon.height*10}cm</p>
                </div>

                <div className="detail">
                    <p className="statistic">Weight:</p>
                    <p className="value">{pokemon.weight}lbs</p>
                </div>
                
            </div>
        </div>
    )
}
