import React, { useState, useEffect } from "react";
import { PokemonType } from "./PokemonType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagicWandSparkles, faRotate, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

export function Pokedex(props) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [shownSprite, setShownSprite] = useState(null);
  const [shinyToggle, setShinyToggle] = useState(false);
  const [chosenGender, setChosenGender] = useState("default");
  const [facingDirection, setFacingDirection] = useState("front");
  const [setVariety, setSetVariety] = useState(null);
  const [types, setTypes] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setShinyToggle(false);
        setChosenGender("default");
        setFacingDirection("front");

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.name}`);
        const data = await response.json();

        const types = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.varieties[0].pokemon.name}`);
        const typesResponse = await types.json();

        setTypes(typesResponse.types);
        setSelectedPokemon(data)
        setSetVariety(data.varieties[0].pokemon.name)
        getSprite("front", "default", data.varieties[0].pokemon.name)
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }

    fetchData();
  }, [props.name]);

  async function getSprite(direction, gender, variety, shiny=false) {
    setFacingDirection(direction);
    setChosenGender(gender);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${variety}`);
    const data = await response.json();
    if(gender === "default" && shiny === false) {
      setShownSprite(data.sprites[direction+"_default"])
    } else if(gender === "default" && shiny === true) {
      setShownSprite(data.sprites[direction+"_shiny"])
    } else if(gender === "female" && shiny === false) {
      setShownSprite(data.sprites[direction+"_female"])
    } else if(gender === "female" && shiny === true) {
      setShownSprite(data.sprites[direction+"_shiny_female"])
    }
  }

  function toggleShiny() {
    setShinyToggle(prevShinyToggle => !prevShinyToggle);
  }
  useEffect(() => {
    getSprite(facingDirection, chosenGender, setVariety, shinyToggle)
  }, [shinyToggle]);

  function rotate() {
    if(facingDirection === "front") {
      setFacingDirection("back")
    } else {
      setFacingDirection("front")
    }
  }
  useEffect(() => {
    getSprite(facingDirection, chosenGender, setVariety)
  }, [facingDirection]);


  return (
    <div>
      {selectedPokemon && (
        <div>
          <div className="shiny-icon">
            <button href="#" className={shinyToggle ? "shiny-enabled" : "shiny-disabled"} onClick={() => toggleShiny()}>
              <FontAwesomeIcon className={shinyToggle ? "shiny-enabled-icon" : "shiny-disabled-icon"} icon={faMagicWandSparkles} transform="grow-7" />
            </button>
          </div>

          <div className="rotate-icon">
            <button href="#" className="rotation" onClick={() => rotate()}>
              <FontAwesomeIcon className="rotation-icon" icon={faRotate} transform="grow-7" />
            </button>
          </div>
          {selectedPokemon.name}
          
          <br />
          {(types && 
          <div>
            {types.map((type) => (
              <PokemonType key={type.type.name} type={type.type.name} />
            ))}
          </div>
          )}

          
          <img className="pokemonImage" src={shownSprite} alt={selectedPokemon.name} />

          {(selectedPokemon.has_gender_differences && 
              <div>
                {(chosenGender === "default" &&
                  <div className="gender-icon">
                    <button className="gender" href="#" onClick={() => getSprite(facingDirection, "female", setVariety)}>
                      <FontAwesomeIcon className="gendered-icon" icon={faMars} transform="grow-7" />
                    </button>
                  </div>       
                )}
                {(chosenGender === "female" &&
                  <div className="gender-icon">
                    <button className="gender" href="#" onClick={() => getSprite(facingDirection, "default", setVariety)}>
                      <FontAwesomeIcon className="gendered-icon" icon={faVenus} transform="grow-7" />
                    </button>
                  </div> 
                )}
              </div>
          )}
        </div>
      )}
    </div>
  );
}
