import React from "react";

export function PokemonDetail(props) {
    return (
        <div className="detail">
            <p className="statistic">{props.statistic}</p>
            <p className="value">{props.value}{props.unit}</p>
        </div>
    )
}
