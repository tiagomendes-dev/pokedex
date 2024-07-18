export default function Header() {
  return (
    <header className="relative z-0 flex h-60 w-screen items-center justify-end bg-red-600">
      <div className="lg:mr-40">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png"
          alt=""
          className="size-40"
        />
      </div>
      <div className="absolute bottom-16 left-16 flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-black bg-white">
        <div className="h-14 w-14 rounded-full border-2 border-black/20 bg-white shadow-lg" />
      </div>
      <div className="absolute bottom-0 -z-50 h-28 w-full border-t-[10px] border-black bg-white" />
    </header>
  );
}
