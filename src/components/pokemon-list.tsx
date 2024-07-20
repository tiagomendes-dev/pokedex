import React from "react";

// Definições de tipos
interface Pokemon {
  id: number;
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemons: Pokemon[];
  onPokemonClick: (url: string) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  onPokemonClick,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} onClick={() => onPokemonClick(pokemon.url)}>
          <div className="group cursor-pointer rounded-lg bg-neutral-100 p-4 shadow transition hover:scale-105 hover:bg-neutral-200 hover:shadow-md">
            <div className="flex items-center">
              <div className="relative rounded-xl bg-zinc-200 p-4 transition group-hover:bg-zinc-300">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="size-20"
                />


              </div>
              <h2 className="flex-1 text-center text-lg capitalize">
                {pokemon.name}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
