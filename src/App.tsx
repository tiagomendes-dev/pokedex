import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [pokemons, setPokemons] = useState<AxiosResponse[]>([]);

  const fetchPokemons = () => {
    const pokemonEndpoints = [];
    for (let i = 1; i < 10000; i++) {
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
    <div>
      {/* {pokemons.map((pokemon, key) => (
        <div key={key}>{pokemon.data.name}</div>
      ))} */}
    </div>
  );
}
