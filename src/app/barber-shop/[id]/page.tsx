import PhoneList from "@/app/_components/PhoneList";
import ServiceCard from "@/app/_components/ServicesCard";
import SheetComponent from "@/app/_components/SheetComponent";
import { Button } from "@/app/_components/ui/button";
import { getBarberShopById } from "@/app/_dal/get-barberShops";
import { ChevronLeft, MapPin, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IBarberShopProps {
  params: {
    id: string;
  };
}

const BarberShop = async ({ params }: IBarberShopProps) => {
  const barberShop = await getBarberShopById(params.id);

  if (!barberShop) {
    return <h1>Barber shop not found</h1>;
  }

  return (
    <main>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barberShop.name}
          src={barberShop.imageUrl}
          fill
          className="object-cover"
        />
        <Button
          asChild
          variant="secondary"
          className="absolute left-5 top-6 flex h-10 w-10 items-center justify-center p-0"
        >
          <Link href="/">
            <ChevronLeft className="size-5" />
          </Link>
        </Button>
        <SheetComponent>
          <Button
            asChild
            variant="secondary"
            className="absolute right-5 top-6 flex h-10 w-10 cursor-pointer items-center justify-center p-2.5"
          >
            <MenuIcon className="size-5" />
          </Button>
        </SheetComponent>
      </div>
      <div className="flex flex-col border-b border-solid px-5 pb-6 pt-4">
        <h2 className="text-xl font-bold leading-5">{barberShop.name}</h2>
        <div className="mb-2 mt-4 flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <p className="text-sm leading-5">{barberShop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon size={16} className="fill-primary text-primary" />
          <p className="text-sm leading-5">5,0 (889 avaliações)</p>
        </div>
      </div>
      <div className="flex flex-col border-b border-solid px-5 py-6">
        <h4 className="text-xs font-bold uppercase leading-6 text-gray-300">
          Sobre nós
        </h4>
        <p className="mt-3 text-sm leading-[1.4]">{barberShop.description}</p>
      </div>
      <div className="flex flex-col border-b border-solid px-5 py-6">
        <h4 className="text-xs font-bold uppercase leading-6 text-gray-300">
          Serviços
        </h4>
        <div className="mt-3 flex flex-wrap gap-3">
          {barberShop.services.map((service) => (
            <ServiceCard
              key={service.id}
              barberShop={JSON.parse(JSON.stringify(barberShop))}
              service={{
                id: service.id,
                name: service.name,
                price: Number(service.price),
                description: service.description,
                imageUrl: service.imageUrl,
                barbershopId: service.barbershopId,
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col px-5 pt-6">
        <h4 className="text-xs font-bold uppercase leading-6 text-gray-300">
          Contato
        </h4>
        <div className="space-y-3">
          {barberShop.phones.map((phone, index) => (
            <PhoneList key={`phone-${index}-${phone}`} phone={phone} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BarberShop;
