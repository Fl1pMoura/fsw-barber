"use client";
import { Card } from "@/_components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";
import { Barbershop, Booking } from "@prisma/client";
import clsx from "clsx";
import { set } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { createBooking } from "../_actions/create-booking";
import { BOOKINGS_AVAILABLE } from "../_constants/bookingsAvailabel";
import { getBookings } from "../_dal/get-bookings";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

interface IBookingSheetProps {
  children: ReactNode;
  barberShop: Pick<Barbershop, "name">;
  service: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    barbershopId: string;
  };
}

const BookingSheet = ({
  children,
  barberShop,
  service,
}: IBookingSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>(
    BOOKINGS_AVAILABLE[0],
  );
  const [bookings, setBookings] = useState<Booking[]>([]);

  const getTimeList = (bookings: Booking[]) => {
    return BOOKINGS_AVAILABLE.filter((time) => {
      const hour = Number(time.split(":")[0]);
      const minute = Number(time.split(":")[1]);
      const isBooked = bookings.some(
        (booking) =>
          booking.date.getHours() === hour &&
          booking.date.getMinutes() === minute,
      );

      if (isBooked) {
        return false;
      }

      return true;
    });
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getBookings({
        date: selectedDate,
      });
      setBookings(res);
    };
    fetch();
  }, [selectedDate, service.id]);

  const newDateTime = set(selectedDate, {
    hours: Number(selectedTime?.split(":")[0]),
    minutes: Number(selectedTime?.split(":")[1]),
  });

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  async function handleBooking() {
    try {
      await createBooking({
        date: newDateTime,
        serviceId: service.id,
      });
      toast.success("Reserva realizada com sucesso");
      setSelectedDate(new Date());

      setSelectedTime(BOOKINGS_AVAILABLE[0]);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao realizar reserva");
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-auto px-0">
        <SheetHeader className="border-b text-start">
          <SheetTitle className="mb-8 px-5 text-lg font-bold">
            Fazer Reserva
          </SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <Calendar
            required
            className="w-full px-0"
            classNames={{
              day_button: "rounded-full transition-colors border-none",
              today: "rounded-full transition-colors bg-secondary",
            }}
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            disabled={{ before: new Date() }}
            styles={{
              selected: {
                backgroundColor: "primary",
                color: "primary-foreground",
              },
              head_cell: {
                width: "100%",
                textTransform: "capitalize",
              },
              cell: {
                width: "100%",
              },
              button: {
                width: "100%",
              },
              nav_button_previous: {
                width: "32px",
                height: "32px",
              },
              nav_button_next: {
                width: "32px",
                height: "32px",
              },
              caption: {
                textTransform: "capitalize",
              },
            }}
          />
        </div>
        {selectedDate && (
          <div className="no-scrollbar flex items-center gap-3 overflow-auto border-y px-5 py-6">
            {getTimeList(bookings).map((booking) => (
              <Button
                onClick={() => handleSelectTime(booking)}
                key={booking}
                variant={"outline"}
                className={clsx(
                  "rounded-full",
                  selectedTime === booking &&
                    "bg-primary text-primary-foreground",
                )}
              >
                {booking}
              </Button>
            ))}
          </div>
        )}
        {selectedDate && selectedTime && (
          <Card className="mx-5 mt-6 space-y-3 p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{service.name}</h3>
              <span className="text-sm font-bold text-white">
                {Number(service.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <b className="text-sm font-normal text-gray-300">Data</b>
              <span className="text-sm font-normal text-white">
                {selectedDate.toLocaleDateString("pt-BR")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <b className="text-sm font-normal text-gray-300">Horário</b>
              <span className="text-sm font-normal text-white">
                {selectedTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <b className="text-sm font-normal text-gray-300">Barbearia</b>
              <span className="text-sm font-normal text-white">
                {barberShop.name}
              </span>
            </div>
          </Card>
        )}
        <SheetFooter className="px-5 py-6">
          <SheetClose asChild>
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              className="mt-auto"
            >
              Reservar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;
