import { ChevronRightIcon } from "lucide-react";

interface CardProps {
  id: number;
  image: string;
  name: string;
}

export default function Card({ id, image, name }: CardProps) {
  return (
    <div className="flex items-center justify-between shadow-md bg-white rounded-xl p-4 hover:scale-105 hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center gap-4">
        <img src={image} alt="" className="size-20" />
        <div>
          <p className="text-sm text-black/60">
            #{id.toString().padStart(3, "0")}
          </p>
          <h2 className="text-xl font-semibold capitalize line-clamp-1">
            {name}
          </h2>
        </div>
      </div>
      <ChevronRightIcon size={12} />
    </div>
  );
}
