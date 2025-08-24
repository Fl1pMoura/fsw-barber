import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { Card, CardContent } from "@/_components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const bookingStatus = () => {
    if (booking.date < new Date()) {
      return "Finalizado";
    }
    return "Confirmado";
  };
  return (
    <Card className="w-full min-w-[75%]">
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
  );
};

export default BookingCard;
