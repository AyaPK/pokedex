import React from "react";
import { getVarietyName } from "./helperMethods";

export function PokemonVariety(props) {
    function getNamesFromVarietes() {
        const vars = props.varieties.map(p => (
            p.pokemon.name
        ))
        return vars
    }

    const handleVarietyChange = (event) => {
        props.updateSelectedVariety(event.target.value)
    };

    return(
        <div>
            <select className="variety-dropdown" onChange={handleVarietyChange}>
                {getNamesFromVarietes().map((option, index) => (
                    <option key={index} value={option}>
                        {getVarietyName(option, props.name)}
                    </option>
                ))}
            </select>
        </div>
    )
}
