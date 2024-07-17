import axios from "axios";
import { XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PokemonDetail {
  name: string;
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
  hp: { name: "HP", color: "rgb(34 197 94)", background: "rgb(220 252 231)" },
  attack: {
    name: "Ataque",
    color: "rgb(239 68 68)",
    background: "rgb(254 226 226)",
  },
  defense: {
    name: "Defesa",
    color: "rgb(59 130 246)",
    background: "rgb(219 234 254)",
  },
  "special-attack": {
    name: "Ataque Especial",
    color: "rgb(244 63 94)",
    background: "rgb(255 228 230)",
  },
  "special-defense": {
    name: "Defesa Especial",
    color: "rgb(168 85 247)",
    background: "rgb(243 232 255)",
  },
  speed: {
    name: "Velocidade",
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
        setPokemon(response.data);
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

              <p className="text-sm text-zinc-400">
                Uma semente estranha foi plantada em suas costas ao nascer. A
                planta brota e cresce com este POKéMON.
              </p>
            </div>

            <div className="h-px w-full bg-zinc-100" />
            <div className="space-y-6">
              <div className="flex justify-around text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <p>Altura:</p> <span>{pokemon.height}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p>Peso:</p> <span>{pokemon.weight}kg</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <div
                      className="h-2 w-full rounded-full"
                      style={{
                        backgroundColor:
                          statMapping[stat.stat.name]?.background || "black",
                      }}
                    />
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
        // <div>
        //   <h2>{pokemon.name}</h2>
        //   <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        //   <ul>
        //     {pokemon.types.map((type, index) => (
        //       <li key={index}>{type.type.name}</li>
        //     ))}
        //   </ul>
        //   <button onClick={onRequestClose}>Close</button>
        // </div>
      )}
    </>
  );
};

export default PokemonModal;
