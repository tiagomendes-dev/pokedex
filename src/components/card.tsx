interface CardProps {
  id: number;
  image: string;
  name: string;
}

export default function Card({ id, image, name }: CardProps) {
  return (
    <div className="group cursor-pointer rounded-lg bg-neutral-100 p-4 shadow transition hover:scale-105 hover:bg-neutral-200 hover:shadow-md">
      <div className="flex items-center">
        <div className="relative rounded-xl bg-zinc-200 p-4 transition group-hover:bg-zinc-300">
          <img src={image} alt={name} className="size-20" />
          <span className="absolute bottom-2 left-2 rounded-full bg-zinc-50 px-2 text-xs text-black/60">
            #{id.toString().padStart(3, "0")}
          </span>
        </div>
        <h2 className="flex-1 text-center text-lg capitalize">{name}</h2>
      </div>
    </div>
  );
}
