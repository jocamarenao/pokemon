import { useEffect, useState } from "react";

import './PokemonList.css'

import PokemonDetails from '../PokemonDetails';

type PokemonType = {
  name: string;
  url: string;
}

type PagesType = {
  previous: string;
  next: string;
}

type PokemonArrayType = PokemonType[] | [];

const PokemonList = () => {
  const [pokemon, setPokemon] = useState<PokemonArrayType>([]);
  const [pages, setPages] = useState<PagesType>({ previous: "", next: ""});
  const [url, setURL] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=10');
  const [pokemonURL, setpokemonURL] = useState<string>('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonResponse = await fetch(url).then(response => response.json());
      const { previous, next } = pokemonResponse;

      setPokemon(pokemonResponse.results);
      setPages({ previous, next });
    };

    fetchPokemon();
  }, [url]);

  const { previous, next } = pages;

  const handleBack = (): void => {
    setpokemonURL('');
  }

  const Container: React.FC = (): JSX.Element => {
    if (pokemonURL) {
      return <PokemonDetails pokemonURL={pokemonURL} onBack={handleBack} />
    }

    return ( 
      <>
        <div className='list-container'>
          {
            pokemon.map((pokemon: PokemonType): JSX.Element => (
              <div className="card" key={pokemon.name} onClick={() => setpokemonURL(pokemon.url)}>{pokemon.name}</div>
            ))
          }
        </div>
        <div className='button-container'>
          <button disabled={!previous} onClick={() => setURL(previous)}>Previous</button>
          <button disabled={!next} onClick={() => setURL(next)}className="button-spacing">Next</button>
        </div>
      </>
    )
  }

  return (
    <div className="root">
      <div className='container'>
        <Container />
      </div>
    </div>
  );
};

export default PokemonList;
