"use client";

import { Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface IPhoneListProps {
  phone: string;
}

function handleCopyToClipboard(phone: string) {
  navigator.clipboard.writeText(phone);
  toast.success("Número copiado para a área de transferência");
}

const PhoneList = ({ phone }: IPhoneListProps) => {
  return (
    <div className="flex items-center">
      <Smartphone size={18} />
      <p className="leading-[1.4 ml-2.5 text-sm">{phone}</p>
      <Button
        onClick={() => handleCopyToClipboard(phone)}
        variant={"outline"}
        className="ml-auto"
      >
        Copiar
      </Button>
    </div>
  );
};

export default PhoneList;
