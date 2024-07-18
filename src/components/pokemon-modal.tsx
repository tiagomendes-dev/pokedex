import axios from "axios";
import { XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PokemonDetail {
  name: string;
  description: string;
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
}

interface PokemonModalProps {
  pokemonUrl: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const statMapping: {
  [key: string]: { name: string; color: string; background: string };
} = {
  hp: {
    name: "HP",
    color: "rgb(34 197 94)",
    background: "rgb(220 252 231)",
  },
  attack: {
    name: "Attack",
    color: "rgb(239 68 68)",
    background: "rgb(254 226 226)",
  },
  defense: {
    name: "Defense",
    color: "rgb(59 130 246)",
    background: "rgb(219 234 254)",
  },
  "special-attack": {
    name: "Special Attack",
    color: "rgb(244 63 94)",
    background: "rgb(255 228 230)",
  },
  "special-defense": {
    name: "Special Defense",
    color: "rgb(168 85 247)",
    background: "rgb(243 232 255)",
  },
  speed: {
    name: "Speed",
    color: "rgb(249 115 22)",
    background: "rgb(255 228 230)",
  },
};

const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemonUrl,
  onRequestClose,
}) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    if (pokemonUrl) {
      axios.get(pokemonUrl).then((response) => {
        const pokemonData = response.data;
        axios.get(pokemonData.species.url).then((speciesResponse) => {
          const speciesData = speciesResponse.data;
          const descriptionEntry = speciesData.flavor_text_entries.find(
            (entry: { language: { name: string } }) =>
              entry.language.name === "en",
          );
          const description = descriptionEntry
            ? descriptionEntry.flavor_text
            : "No description available.";
          setPokemon({ ...pokemonData, description });
        });
      });
    }
  }, [pokemonUrl]);

  return (
    <>
      {pokemon && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="w-[640px] space-y-5 rounded-xl bg-white px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold capitalize">
                  {pokemon.name}
                </h2>
                <button onClick={onRequestClose}>
                  <XIcon />
                </button>
              </div>

              <p className="text-sm text-zinc-400">{pokemon.description}</p>
            </div>

            <div className="h-px w-full bg-zinc-100" />
            <div className="space-y-6">
              <div className="flex justify-around text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <p>Height:</p> <span>{pokemon.height / 10} m</span>
                </div>
                <div className="flex items-center gap-2">
                  <p>Weight:</p> <span>{pokemon.weight / 10} kg</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex h-2 items-center rounded-full bg-zinc-100 px-[2px]">
                      <div
                        style={{
                          width: `${(stat.base_stat / 255) * 100}%`,
                          backgroundColor:
                            statMapping[stat.stat.name]?.color || "black",
                        }}
                        className="h-1 rounded-full opacity-50"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className="text-xs"
                        style={{
                          color: statMapping[stat.stat.name]?.color || "black",
                        }}
                      >
                        {statMapping[stat.stat.name]?.name || stat.stat.name}
                      </p>
                      <span className="text-zinc-300">{stat.base_stat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonModal;
