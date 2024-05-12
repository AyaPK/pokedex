import React, { useState, useEffect } from "react";
import { Pokedex } from "./Pokedex";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from "./SearchBar";

export default function App() {
  const [shownPokemon, setShownPokemon] = useState(undefined);
  const [currentOffset, setCurrentOffset] = useState(0);

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
      chosenNames = chosenNames.map(name => {
        let lowerCaseName = name.toLowerCase();
        let modifiedName = lowerCaseName.replace(/\s+/g, '-');
        
        return modifiedName;
    });

    setShownPokemon(chosenNames.slice(0,20))

    } else {
      getInfo()
    }



  }

  return (
    <div className="App">
      <header className="App-header">
          <h2>Aya's Pokédex</h2>
          {(currentOffset > 0 && 
            <a href="#" className="icon iconLeft" onClick={() => getInfo(currentOffset-1)}>
              <FontAwesomeIcon icon={faArrowLeft} className="icon-right" transform="grow-20" />
            </a>
            
            )}
          <a href="#" className="icon" onClick={() => getInfo(currentOffset+1)}>
            <FontAwesomeIcon icon={faArrowRight} className="icon-right" transform="grow-20" />
          </a>
      </header>

      <body>

      <SearchBar updateSelectedPokemon={updateSelectedPokemon} />

        <div className="card-area">
      {(shownPokemon &&
            shownPokemon.map(p => (
              <div className="Card">
                <Pokedex name={p.toLowerCase()} />
              </div>
            ))
          )}
          </div>
      </body>
    </div>
  );
}
