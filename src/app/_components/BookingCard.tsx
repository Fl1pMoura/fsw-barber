import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { Card, CardContent } from "@/_components/ui/card";

interface IBookingCardProps {
  status: string;
  service: string;
  imageUrl: string;
  barberShopName: string;
}

const BookingCard = ({
  status,
  service,
  imageUrl,
  barberShopName,
}: IBookingCardProps) => {
  return (
    <Card>
      <CardContent className="flex h-full justify-between p-0">
        <div className="w-full p-3">
          {status && <Badge>{status}</Badge>}
          <h5 className="mb-2 mt-3">{service}</h5>
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={imageUrl} />
            </Avatar>
            <p className="text-sm text-white">{barberShopName}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-border px-7">
          <b className="text-xs font-normal">Fevereiro</b>
          <p className="text-2xl text-white">20</p>
          <p className="text-xs font-normal">10:00</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
