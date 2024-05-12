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
      setShownPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }

  useEffect(() => {
    getInfo(currentOffset);
  }, []);

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

      <SearchBar />

        <div className="card-area">
      {(shownPokemon &&
            shownPokemon.results.map(p => (
              <div className="Card">
                <Pokedex name={p.name} />
              </div>
            ))
          )}
          </div>
      </body>
    </div>
  );
}
