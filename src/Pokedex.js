import React, { useState, useEffect } from "react";
import { PokemonType } from "./PokemonType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagicWandSparkles, faRotate, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { PokemonVariety } from "./PokemonVarieties";
import { PokemonDetails } from "./PokemonDetails";

export function Pokedex(props) {
    const [selectedSpecies, setSelectedSpecies] = useState(null);
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

                const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.name}`);
                const data = await species.json();

                const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.varieties[0].pokemon.name}`);
                const pokemonResponse = await pokemon.json();

                setTypes(pokemonResponse.types);
                setSelectedSpecies(data);
                setSelectedPokemon(pokemonResponse);
                setSetVariety(data.varieties[0].pokemon.name)
                getSprite("front", "default", data.varieties[0].pokemon.name)
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
            }
        }

        fetchData();
    }, [props.name]);

    async function getSprite(direction, gender, variety, shiny=false) {
        if(variety) {
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
    }
    useEffect(() => {
        if (shownSprite == null) {
            setShownSprite("no-sprite-found.png")
        }
    }, [shownSprite]);

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
        getSprite(facingDirection, chosenGender, setVariety, shinyToggle)
    }, [facingDirection]);

    function updateSelectedVariety(name) {
        setSetVariety(name)
        getSprite(facingDirection, chosenGender, name, shinyToggle)
        getTypes(name)
    }

    async function getTypes(name) {
        const types = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const typesResponse = await types.json();

        setTypes(typesResponse.types);
    }

    return (
        <div className={"inner-card " + (types && types[0] && types[0].type ? types[0].type.name : "")}>
            {selectedSpecies && (
                <div>
                    <div className="shiny-icon">
                        <button href="#" className="hidden-button" onClick={() => toggleShiny()}>
                            <FontAwesomeIcon className={shinyToggle ? "shiny-enabled-icon" : "shiny-disabled-icon"} icon={faMagicWandSparkles} transform="grow-7" />
                        </button>
                    </div>

                    <div className="rotate-icon">
                        <button href="#" className="hidden-button" onClick={() => rotate()}>
                            <FontAwesomeIcon className="button-icon" icon={faRotate} transform="grow-7" />
                        </button>
                    </div>
                    <div className="pokedex-number">
                        #{selectedSpecies.pokedex_numbers[0].entry_number}
                    </div>
                    <div className="pokemon-name">
                        {selectedSpecies.name}
                    </div>
          
                    {(types && 
          <div>
              {types.map((type) => (
                  <PokemonType key={type.type.name} type={type.type.name} />
              ))}
          </div>
                    )}

          
                    <img className="pokemonImage" src={shownSprite} alt={selectedSpecies.name} />

                    {(selectedSpecies.has_gender_differences && 
              <div>
                  {(chosenGender === "default" &&
                  <div className="gender-icon">
                      <button className="hidden-button" href="#" onClick={() => getSprite(facingDirection, "female", setVariety, shinyToggle)}>
                          <FontAwesomeIcon className="button-icon" icon={faMars} transform="grow-7" />
                      </button>
                  </div>       
                  )}
                  {(chosenGender === "female" &&
                  <div className="gender-icon">
                      <button className="hidden-button" href="#" onClick={() => getSprite(facingDirection, "default", setVariety, shinyToggle)}>
                          <FontAwesomeIcon className="button-icon" icon={faVenus} transform="grow-7" />
                      </button>
                  </div> 
                  )}
              </div>
                    )}

                    <div className="variety-container">

                        {(selectedSpecies.varieties.length > 1 &&
                        <div>
                            <PokemonVariety varieties={selectedSpecies.varieties} updateSelectedVariety={updateSelectedVariety} name={selectedSpecies.name}/>
                        </div>
                        )}
                    </div>
                </div>
            )}
            
            {selectedSpecies &&
                <div className="details-area">
                    <PokemonDetails selectedPokemon={selectedPokemon} selectedSpecies={selectedSpecies} />
                </div>
            }

        </div>
    );
}
