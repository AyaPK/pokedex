import React from "react";

export function PokemonVariety(props) {
    function getVarietyName(input) {
        if (input === props.name) {
            return "default";
        } else {
            const baseIndex = input.indexOf(props.name);
            if (baseIndex !== -1) {
                return input.slice(baseIndex+1 + props.name.length);
            } else {
                return input;
            }
        }
    }

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
                        {getVarietyName(option)}
                    </option>
                ))}
            </select>
        </div>
    )
}
