"use client";
import { Badge } from "@/_components/ui/badge";
import { Card, CardContent } from "@/_components/ui/card";
import { StarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginDialog from "./LoginDialog";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";

interface IBarberCardProps {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
}

const BarberCard = ({ name, address, imageUrl, id }: IBarberCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const { data } = useSession();
  function handleBookingButtonClick() {
    if (!data?.user) {
      setIsDialogOpen(true);
      return;
    }
    router.push(`/barber-shop/${id}`);
  }
  return (
    <>
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
            <p className="mb-3 mt-1 truncate text-xs text-gray-300">
              {address}
            </p>
            <Button
              onClick={handleBookingButtonClick}
              variant={"secondary"}
              className="w-full"
            >
              Reservar
            </Button>
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

export default BarberCard;
