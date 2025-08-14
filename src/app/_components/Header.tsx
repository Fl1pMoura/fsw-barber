import { MenuIcon } from "lucide-react";
import Image from "next/image";
import SheetComponent from "./SheetComponent";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-solid border-border px-6 py-5">
      <Image alt="FSW Barber" src={"/logo.png"} width={130} height={22} />
      <SheetComponent>
        <Button size={"icon"} variant={"ghost"} className="size-10">
          <MenuIcon size={5} />
        </Button>
      </SheetComponent>
    </header>
  );
};
