import { SearchIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="py-10 flex items-center justify-center">
      <div className="p-4 bg-white w-96 rounded-xl flex items-center gap-2">
        <SearchIcon color="#000" />
        <input
          type="text"
          className="w-full bg-transparent"
          placeholder="Procure pelo nome do pokémon"
        />
      </div>
    </header>
  );
}
