"use client";
import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { Card, CardContent } from "@/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";
import { Prisma } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBooking } from "../_actions/delete-booking";
import PhoneList from "./PhoneList";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface IBookingCardProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true };
      };
    };
  }>;
}

const BookingCard = ({ booking }: IBookingCardProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const bookingStatus = () => {
    if (booking.date < new Date()) {
      return "Finalizado";
    }
    return "Confirmado";
  };

  async function handleCancelBooking() {
    try {
      await deleteBooking({ id: booking.id });
      setIsSheetOpen(false);
      toast.success("Reserva cancelada com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cancelar reserva");
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Card className="w-[75%] min-w-[75%] cursor-pointer">
          <CardContent className="flex h-full justify-between p-0">
            <div className="w-full p-3">
              {bookingStatus() && (
                <Badge
                  variant={
                    bookingStatus() === "Confirmado" ? "default" : "secondary"
                  }
                >
                  {bookingStatus()}
                </Badge>
              )}
              <h5 className="mb-2 mt-3">{booking.service.name}</h5>
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm text-white">
                  {booking.service.barbershop.name}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-border px-7">
              <b className="text-xs font-normal capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </b>
              <p className="text-2xl text-white">
                {format(booking.date, "d", { locale: ptBR })}
              </p>
              <p className="text-xs font-normal">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="min-h-10 w-full border-b px-5 py-6">
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col px-5">
          <div className="relative mt-6 flex h-[180px] w-full flex-col justify-end">
            <Image
              alt={`Mapa de ${booking.service.barbershop.name}`}
              fill
              className="z-0 object-cover"
              src="/map.png"
            />
            <div className="relative z-50 mx-3 mb-5 flex items-center gap-3 rounded-[8px] bg-[#1A1B1F] px-5 py-3">
              <Avatar className="size-12">
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <div>
                <h2 className="text-white">
                  {booking.service.barbershop.name}
                </h2>
                <p className="line-clamp-1 text-sm text-white">
                  {booking.service.barbershop.address}
                </p>
              </div>
            </div>
          </div>
          <Badge
            className="mb-3 mt-6 w-fit"
            variant={bookingStatus() === "Confirmado" ? "default" : "secondary"}
          >
            {bookingStatus()}
          </Badge>
          <Card className="space-y-3 p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {booking.service.name}
              </h3>
              <span className="text-sm font-bold text-white">
                {Number(booking.service.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <b className="text-sm font-normal text-gray-300">Data</b>
              <span className="text-sm font-normal text-white">
                {format(booking.date, "d 'de' MMMM", {
                  locale: ptBR,
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <b className="text-sm font-normal text-gray-300">Horário</b>
              <span className="text-sm font-normal text-white">
                {format(booking.date, "HH:mm", {
                  locale: ptBR,
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <b className="text-sm font-normal text-gray-300">Barbearia</b>
              <span className="text-sm font-normal text-white">
                {booking.service.barbershop.name}
              </span>
            </div>
          </Card>
          <div className="mt-6 space-y-3">
            {booking.service.barbershop.phones.map((phone, index) => (
              <PhoneList key={index} phone={phone} />
            ))}
          </div>
          <div className="mb-6 mt-auto flex items-center gap-3">
            <SheetTrigger asChild>
              <Button className="w-full" variant={"default"}>
                Voltar
              </Button>
            </SheetTrigger>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" variant={"destructive"}>
                  Cancelar Reservar
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[70%] rounded-[10px]">
                <DialogHeader>
                  <DialogTitle>Cancelar Reserva</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja cancelar esse agendamento?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3">
                  <DialogClose asChild>
                    <Button className="w-full" variant={"secondary"}>
                      Voltar
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={handleCancelBooking}
                      className="w-full"
                      variant={"destructive"}
                    >
                      Confirmar
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingCard;
