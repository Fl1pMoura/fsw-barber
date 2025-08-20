"use client";
import { Card, CardContent } from "@/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import BookingSheet from "./BookingSheet";
import LoginDialog from "./LoginDialog";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";

interface IServiceCardProps {
  barberShop: Barbershop;
  service: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    barbershopId: string;
  };
}

const ServiceCard = ({ barberShop, service }: IServiceCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data } = useSession();
  function handleBookingButtonClick() {
    if (!data?.user) {
      setIsDialogOpen(true);
      return;
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardContent className="flex items-center gap-5 p-3">
          <div className="relative min-h-[110px] min-w-[110px] max-w-[110px] overflow-clip rounded-[8px]">
            <Image
              src={barberShop.imageUrl}
              alt={barberShop.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <h5 className="text-sm font-black leading-[1.4]">{service.name}</h5>
            <p className="mb-3 mt-2 line-clamp-2 text-sm leading-[1.4] text-gray-300">
              {barberShop.description}
            </p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-black leading-[1.4] text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </span>
              <BookingSheet barberShop={barberShop} service={service}>
                <Button
                  onClick={handleBookingButtonClick}
                  variant={"secondary"}
                >
                  Reservar
                </Button>
              </BookingSheet>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[318px] rounded-[10px] border-none">
          <LoginDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCard;
