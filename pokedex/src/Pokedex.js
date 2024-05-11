import React, { useState, useEffect } from "react";
import { PokemonType } from "./PokemonType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagicWandSparkles, faRotate } from '@fortawesome/free-solid-svg-icons';

export function Pokedex(props) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [shownSprite, setShownSprite] = useState(null);
  const [shinyToggle, setShinyToggle] = useState(false);
  const [chosenGender, setChosenGender] = useState("default");
  const [facingDirection, setFacingDirection] = useState("front");

  useEffect(() => {
    async function fetchData() {
      try {
        setShinyToggle(false);
        setChosenGender("default");
        setFacingDirection("front");

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
        const data = await response.json();
        setSelectedPokemon(data);
        setShownSprite(data.sprites.other.showdown.front_default);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }

    fetchData();
  }, [props.name]);

  async function getSprite(direction, gender) {
    setFacingDirection(direction);
    setChosenGender(gender);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
    const data = await response.json();
    if(gender === "default" && shinyToggle === false) {
      setShownSprite(data.sprites.other.showdown[direction+"_default"])
    } else if(gender === "default" && shinyToggle === true) {
      setShownSprite(data.sprites.other.showdown[direction+"_shiny"])
    } else if(gender === "female" && shinyToggle === false) {
      setShownSprite(data.sprites.other.showdown[direction+"_female"])
    } else if(gender === "female" && shinyToggle === true) {
      setShownSprite(data.sprites.other.showdown[direction+"_shiny_female"])
    }
  }

  function toggleShiny() {
    setShinyToggle(prevShinyToggle => !prevShinyToggle);
  }
  useEffect(() => {
    getSprite(facingDirection, chosenGender)
  }, [shinyToggle]);

  function rotate() {
    if(facingDirection === "front") {
      setFacingDirection("back")
    } else {
      setFacingDirection("front")
    }
  }
  useEffect(() => {
    getSprite(facingDirection, chosenGender)
  }, [facingDirection]);

  return (
    <div>
      {selectedPokemon && (
        <div>
          <div className="shiny-icon">
            <a href="#" className={shinyToggle ? "shiny-enabled" : "shiny-disabled"} onClick={() => toggleShiny()}>
              <FontAwesomeIcon icon={faMagicWandSparkles} />
            </a>
          </div>

          <div className="rotate-icon">
            <a href="#" className="rotation" onClick={() => rotate()}>
              <FontAwesomeIcon icon={faRotate} />
            </a>
          </div>
          {selectedPokemon.species.name}
          
          <br />
          {selectedPokemon.types.map((type) => (
            <PokemonType key={type.type.name} type={type.type.name} />
          ))}
          
          <img className="pokemonImage" src={shownSprite} alt={selectedPokemon.species.name} />
          <hr/>

          <br/>

          {(selectedPokemon.sprites.front_female && 
          <div>
            <button onClick={() => getSprite(facingDirection, "default")}>♂</button>
            <button onClick={() => getSprite(facingDirection, "female")}>♀</button>
          </div>
            )}
        </div>
      )}
    </div>
  );
}
