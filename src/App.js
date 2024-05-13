import React, { useState, useEffect } from "react";
import { Pokedex } from "./Pokedex";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "./SearchBar";

export default function App() {
    const [shownPokemon, setShownPokemon] = useState(undefined);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [searching, setSearching] = useState(false);

    async function getInfo(offset) {
        const URL = "https://pokeapi.co/api/v2/pokemon/?offset="+(offset*20);
        setCurrentOffset(offset)

        try {
            const response = await fetch(URL);
            const data = await response.json();

            const pokemonToShow = data.results.map(p => (p.name.toLowerCase()));
            setShownPokemon(pokemonToShow)

      
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    }

    useEffect(() => {
        getInfo(currentOffset);
    }, []);

    async function updateSelectedPokemon(chosenNames) {
        if(chosenNames) {
            setSearching(true);
            chosenNames = chosenNames.map(name => {
                let lowerCaseName = name.toLowerCase();
                let modifiedName = lowerCaseName.replace(/\s+/g, "-");
        
                return modifiedName;
            });
            setShownPokemon(chosenNames.slice(0,20))

        } else {
            setSearching(false);
            getInfo(currentOffset)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2>Aya&apos;s Pokédex</h2>
                {(!searching && 
            <div>

                {(currentOffset > 0 && 
                <button href="#" className="hidden-button iconLeft" onClick={() => getInfo(currentOffset-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} className="button-icon" transform="grow-30" />
                </button>
                
                )}
                <button href="#" className="hidden-button" onClick={() => getInfo(currentOffset+1)}>
                    <FontAwesomeIcon icon={faArrowRight} className="button-icon" transform="grow-30" />
                </button>

            </div>
                )}

            </header>

            <body>

                <SearchBar updateSelectedPokemon={updateSelectedPokemon} />

                <div className="card-area">
                    {(shownPokemon &&
            shownPokemon.map(p => (
                <div key={p.id} className="Card">
                    <Pokedex name={p.toLowerCase()} />
                </div>
            ))
                    )}
                </div>
            </body>
        </div>
    );
}
