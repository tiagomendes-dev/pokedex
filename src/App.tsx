import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import PokemonList from "./components/pokemon-list";
import PokemonModal from "./components/pokemon-modal";

// Definições de tipos
interface Pokemon {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string | null>(
    null,
  );

  const getPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=386")
      .then(async (response) => {
        const results = response.data.results;
        const pokemonsWithImages = await Promise.all(
          results.map(async (pokemon: Pokemon) => {
            const pokemonDetail = await axios.get(pokemon.url);
            return {
              id: pokemonDetail.data.id,
              name: pokemon.name,
              url: pokemon.url,
              imageUrl: pokemonDetail.data.sprites.other.showdown.front_default,
            };
          }),
        );
        setPokemons(pokemonsWithImages);
      });
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const pokemonFilter = (name: string) => {
    const filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (const i in pokemons) {
      if (pokemons[i].name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setPokemons(filteredPokemons);
  };

  const handlePokemonClick = (url: string) => {
    setSelectedPokemonUrl(url);
  };

  const closeModal = () => {
    setSelectedPokemonUrl(null);
  };

  return (
    <div className="m-10">
      <div className="mb-10 flex items-center gap-2 rounded-xl bg-zinc-100 p-2">
        <SearchIcon className="text-zinc-400" />
        <input
          type="text"
          onChange={(e) => pokemonFilter(e.target.value)}
          className="w-full bg-transparent text-zinc-600 outline-none placeholder:text-zinc-400"
          placeholder="Digite o nome do pokémon..."
        />
      </div>
      <PokemonList pokemons={pokemons} onPokemonClick={handlePokemonClick} />
      {selectedPokemonUrl && (
        <PokemonModal
          pokemonUrl={selectedPokemonUrl}
          isOpen={!!selectedPokemonUrl}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
}
