import { Card, CardContent } from "@/_components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface IServiceCardProps {
  imageUrl: string;
  service: string;
  description: string;
  price: number;
}

const ServiceCard = ({
  description,
  imageUrl,
  price,
  service,
}: IServiceCardProps) => {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center gap-5 p-3">
        <div className="relative min-h-[110px] min-w-[110px] max-w-[110px] overflow-clip rounded-[8px]">
          <Image src={imageUrl} alt={service} fill className="object-cover" />
        </div>
        <div className="w-full">
          <h5 className="text-sm font-black leading-[1.4]">{service}</h5>
          <p className="mb-3 mt-2 text-sm leading-[1.4] text-gray-300">
            {description}
          </p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-black leading-[1.4] text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(price)}
            </span>
            <Button variant={"secondary"}>Reservar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
