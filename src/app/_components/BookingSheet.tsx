"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";
import clsx from "clsx";
import { set } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { createBooking } from "../_actions/create-booking";
import { BOOKINGS_AVAILABLE } from "../_constants/bookingsAvailabel";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

interface IBookingSheetProps {
  children: ReactNode;
  serviceId: string;
}

const BookingSheet = ({ children, serviceId }: IBookingSheetProps) => {
  console.log(serviceId);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [selectedTime, setSelectedTime] = useState<string>(
    BOOKINGS_AVAILABLE[0],
  );

  const newDateTime = set(selectedDate, {
    hours: Number(selectedTime?.split(":")[0]),
    minutes: Number(selectedTime?.split(":")[1]),
  });

  console.log(newDateTime);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  async function handleBooking() {
    try {
      await createBooking({
        date: newDateTime,
        serviceId: serviceId,
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

        <div className="no-scrollbar flex items-center gap-3 overflow-auto border-y px-5 py-6">
          {BOOKINGS_AVAILABLE.map((booking) => (
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
          <span>{}</span>
        </div>

        <SheetFooter className="border-t px-5 py-6">
          <Button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            className="w-full"
          >
            Reservar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;
