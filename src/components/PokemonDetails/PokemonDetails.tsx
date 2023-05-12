import { useEffect, useState } from "react";

import './PokemonDetails.css'

type PokemonType = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  }
}

type PokemonObjectType = PokemonType | null;

type PokemonDetailsPropsType = {
  pokemonURL: string;
  onBack: () => void;
}

const PokemonDetails = (props: PokemonDetailsPropsType) => {
  const [pokemon, setPokemon] = useState<PokemonObjectType>(null);

  const { pokemonURL, onBack } = props;

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonResponse = await fetch(pokemonURL).then(response => response.json());
      setPokemon(pokemonResponse);
    };

    fetchPokemon();
  }, []);

  if (!pokemon) {
    return null
  }

  const { name, sprites } = pokemon as PokemonType; 

  return (
    <div className="pd_card">
      <div className="pd_container">
        <p className="pd_name">{name}</p>
        <img src={sprites.front_default}></img>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default PokemonDetails;
