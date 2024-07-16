import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Card from "./card";

export default function List() {
  const [pokemons, setPokemons] = useState<AxiosResponse[]>([]);

  const fetchPokemons = () => {
    const pokemonEndpoints = [];
    for (let i = 1; i < 387; i++) {
      pokemonEndpoints.push("https://pokeapi.co/api/v2/pokemon/" + i);
    }
    axios
      .all(pokemonEndpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res));
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 w-full h-full">
      {pokemons.map((pokemon, key) => (
        <div key={key}>
          <Card
            id={pokemon.data.id}
            image={pokemon.data.sprites.other.dream_world.front_default}
            name={pokemon.data.name}
          />
        </div>
      ))}
    </div>
  );
}
