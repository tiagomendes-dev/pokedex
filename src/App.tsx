import axios from "axios";
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

  useEffect(() => {
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
              imageUrl: pokemonDetail.data.sprites.front_default,
            };
          }),
        );
        setPokemons(pokemonsWithImages);
      });
  }, []);

  const handlePokemonClick = (url: string) => {
    setSelectedPokemonUrl(url);
  };

  const closeModal = () => {
    setSelectedPokemonUrl(null);
  };

  return (
    <div className="m-10">
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
