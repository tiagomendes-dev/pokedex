import { SearchIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-center py-10">
      <div className="flex w-96 items-center gap-2 rounded-xl bg-white p-4">
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
