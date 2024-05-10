import React, { useState, useEffect } from "react";
import { Pokedex } from "./Pokedex";
import "./styles.css";

export default function App() {
  const [shownPokemon, setShownPokemon] = useState(undefined);

  useEffect(() => {
    async function getInfo() {
      const URL = "https://pokeapi.co/api/v2/pokemon/?limit=151";

      try {
        const response = await fetch(URL);
        const data = await response.json();
        setShownPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }

    getInfo();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <h2>Aya's Pokédex</h2>
      </header>

      <body>

      {(shownPokemon &&
            shownPokemon.results.map(p => (
              <div className="Card">
                <Pokedex name={p.name} />
              </div>
            ))
          )}
      </body>
    </div>
  );
}
