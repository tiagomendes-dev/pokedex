import { XIcon } from "lucide-react";

interface ModalProps {
  closeModal: () => void;
}

export default function Modal({ closeModal }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-white px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold capitalize">
              {selectedPokemon.name}
            </h2>
            <button onClick={closeModal}>
              <XIcon />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Uma semente estranha foi plantada em suas costas ao nascer. A planta
            brota e cresce com este POKéMON.
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
                <p className="text-xs text-orange-500">Velocidade de Ataque</p>
                <span className="text-zinc-300">65</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="h-2 w-full rounded-full bg-purple-100" />
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-purple-500">Velocidade de Defesa</p>
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
  );
}
