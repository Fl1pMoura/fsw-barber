import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";
import { Calendar1Icon, HomeIcon, LogOutIcon } from "lucide-react";
import { ReactNode } from "react";
import { quickSearchOptions } from "../_constants/quickSearchOptions";
import { Button } from "./ui/button";

const SheetComponent = ({ children }: { children: ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b pb-6 text-start">
          <SheetTitle className="mb-8 text-lg font-black">Menu</SheetTitle>
          <div className="flex items-center gap-3">
            <Avatar className="size-12 border-2 border-primary">
              <AvatarImage
                alt="FSW Barber"
                src="https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png"
              />
            </Avatar>
            <div>
              <p className="text-base font-bold">Felipe Moura</p>
              <p className="text-xs">felipe.moura@fsw.com</p>
            </div>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-1 border-b py-6">
          <Button
            className="flex min-h-11 w-full items-center justify-start gap-3"
            variant={"ghost"}
          >
            <HomeIcon className="size-4" />
            Ínicio
          </Button>

          <Button
            className="flex min-h-11 w-full items-center justify-start gap-3"
            variant={"ghost"}
          >
            <Calendar1Icon className="size-4" />
            Agendamentos
          </Button>
        </div>
        <div className="flex flex-col gap-1 border-b py-6">
          {quickSearchOptions.map((item) => (
            <Button
              key={item.label}
              variant={"ghost"}
              className="flex min-h-11 w-full items-center justify-start gap-3"
            >
              {item.imageUrl}
              {item.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-1 py-6">
          <Button
            variant={"ghost"}
            className="flex min-h-11 w-full items-center justify-start gap-3"
          >
            <LogOutIcon className="size-4" />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
