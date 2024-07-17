import axios, { AxiosResponse } from "axios";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import Card from "./card";

export default function List() {
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

  function openModal() {
    setIsModalOpen(true);
  }

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
          <div key={key} onClick={openModal}>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-white px-6 py-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Bulsasaur</h2>
                <button onClick={closeModal}>
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
                  <p>Altura:</p> <span>10cm</span>
                </div>
                <div className="flex items-center gap-2">
                  <p>Peso:</p> <span>30g</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <div className="h-2 w-full rounded-full bg-green-100" />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-green-500">HP</p>
                    <span className="text-zinc-300">45</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="h-2 w-full rounded-full bg-red-100" />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-red-500">Ataque</p>
                    <span className="text-zinc-300">49</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="h-2 w-full rounded-full bg-blue-100" />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-blue-500">Defesa</p>
                    <span className="text-zinc-300">49</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="h-2 w-full rounded-full bg-orange-100" />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-orange-500">
                      Velocidade de Ataque
                    </p>
                    <span className="text-zinc-300">65</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="h-2 w-full rounded-full bg-purple-100" />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-purple-500">
                      Velocidade de Defesa
                    </p>
                    <span className="text-zinc-300">65</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="h-2 w-full rounded-full bg-orange-100" />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-orange-500">Velocidade</p>
                    <span className="text-zinc-300">45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
