import React, { useState, useEffect } from "react";
import { PokemonType } from "./PokemonType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagicWandSparkles, faRotate, faMars, faVenus, faV } from '@fortawesome/free-solid-svg-icons';

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

        console.log(props.name)

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
              <FontAwesomeIcon icon={faMagicWandSparkles} transform="grow-7" />
            </a>
          </div>

          <div className="rotate-icon">
            <a href="#" className="rotation" onClick={() => rotate()}>
              <FontAwesomeIcon icon={faRotate} transform="grow-7" />
            </a>
          </div>
          {selectedPokemon.species.name}
          
          <br />
          {selectedPokemon.types.map((type) => (
            <PokemonType key={type.type.name} type={type.type.name} />
          ))}
          
          <img className="pokemonImage" src={shownSprite} alt={selectedPokemon.species.name} />

          {(selectedPokemon.sprites.front_female && 
              <div>
                {(chosenGender === "default" &&
                  <div className="gender-icon">
                    <a href="#" className="rotation" onClick={() => getSprite(facingDirection, "female")}>
                      <FontAwesomeIcon icon={faMars} transform="grow-7" />
                    </a>
                  </div>       
                )}
                {(chosenGender === "female" &&
                  <div className="gender-icon">
                    <a href="#" className="rotation" onClick={() => getSprite(facingDirection, "default")}>
                      <FontAwesomeIcon icon={faVenus} transform="grow-7" />
                    </a>
                  </div> 
                )}
              </div>
            )}
        </div>
      )}
    </div>
  );
}
