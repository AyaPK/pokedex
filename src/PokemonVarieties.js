import React from "react";

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
            <select onChange={handleVarietyChange}>
                {getNamesFromVarietes().map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}
