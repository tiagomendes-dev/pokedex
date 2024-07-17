import { ChevronRightIcon } from "lucide-react";

interface CardProps {
  id: number;
  image: string;
  name: string;
}

export default function Card({ id, image, name }: CardProps) {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow-md transition hover:scale-105 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <img src={image} alt="" className="size-20" />
        <div>
          <p className="text-sm text-black/60">
            #{id.toString().padStart(3, "0")}
          </p>
          <h2 className="line-clamp-1 text-xl font-semibold capitalize">
            {name}
          </h2>
        </div>
      </div>
      <ChevronRightIcon size={12} />
    </div>
  );
}
