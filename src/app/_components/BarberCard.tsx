import { Badge } from "@/_components/ui/badge";
import { Card, CardContent } from "@/_components/ui/card";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface IBarberCardProps {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
}

const BarberCard = ({ name, address, imageUrl, id }: IBarberCardProps) => {
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-[16px]">
      <CardContent className="p-1">
        <div className="relative h-[160px] w-full overflow-clip rounded-[16px]">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
          <Badge className="absolute left-1 top-1 flex gap-1 rounded-full bg-[#221C3DB2] px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            <StarIcon size={12} className="fill-primary stroke-primary" />
            4.5
          </Badge>
        </div>
        <div className="mt-2 px-2 pb-2">
          <h3 className="truncate text-base font-bold">{name}</h3>
          <p className="mb-3 mt-1 truncate text-xs text-gray-300">{address}</p>
          <Button variant={"secondary"} className="w-full">
            <Link href={`/barber-shop/${id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberCard;
