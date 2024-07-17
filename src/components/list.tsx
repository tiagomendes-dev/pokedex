import axios, { AxiosResponse } from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import Card from "./card";
import Modal from "./modal";

export default function List({ setPokemonData }) {
  const [pokemons, setPokemons] = useState<AxiosResponse[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPokemons = () => {
    const pokemonEndpoints = [];
    for (let i = 1; i < 387; i++) {
      pokemonEndpoints.push("https://pokeapi.co/api/v2/pokemon/" + i);
    }
    axios
      .all(pokemonEndpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res));
  };

  const pokemonFilter = (name: string) => {
    const filteredPokemons = [];
    if (name == "") fetchPokemons();
    for (const i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
      setPokemons(filteredPokemons);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const openModal = (pokemonData) => {
    setPokemonData(pokemonData);
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="m-10">
      <div className="my-10 flex flex-1 items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2">
        <SearchIcon className="size-5 text-zinc-400" />
        <input
          type="text"
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
          placeholder="Busque por um pokémon"
          onChange={(e) => pokemonFilter(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {pokemons.map((pokemon, key) => (
          <div key={key} onClick={() => openModal(pokemon.data)}>
            <Card
              id={pokemon.data.id}
              image={
                pokemon.data.sprites.other["official-artwork"].front_default
              }
              name={pokemon.data.name}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
      )}
    </div>
  );
}
