"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";

import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

import { Calendar1Icon, HomeIcon, LogIn, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { quickSearchOptions } from "../_constants/quickSearchOptions";
import LoginDialog from "./LoginDialog";
import { Button } from "./ui/button";

const SheetComponent = ({ children }: { children: ReactNode }) => {
  const { data } = useSession();
  const router = useRouter();

  function handleSignOut() {
    signOut();
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader className="border-b pb-6 text-start">
          <SheetTitle className="mb-8 text-lg font-black">Menu</SheetTitle>
          {data?.user ? (
            <div className="flex items-center gap-3">
              <Avatar className="size-12 border-2 border-primary">
                <AvatarImage
                  alt={data.user.name || ""}
                  src={data.user.image || ""}
                />
              </Avatar>
              <div>
                <p className="text-base font-bold">{data.user.name}</p>
                <p className="break-all text-xs">{data.user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold">Olá. Faça seu login!</h4>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="p-2.5">
                    <LogIn size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[318px] rounded-[10px] border-none">
                  <LoginDialog />
                </DialogContent>
              </Dialog>
            </div>
          )}
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
        <div className="flex flex-col gap-1 py-6">
          {quickSearchOptions.map((item) => (
            <SheetClose asChild key={item.label}>
              <Button
                onClick={() => {
                  router.push(`/barber-shop?service=${item.label}`);
                }}
                key={item.label}
                variant={"ghost"}
                className="flex min-h-11 w-full items-center justify-start gap-3"
              >
                {item.imageUrl}
                {item.label}
              </Button>
            </SheetClose>
          ))}
        </div>
        {data?.user && (
          <div className="flex flex-col gap-1 border-t py-6">
            <Button
              onClick={handleSignOut}
              variant={"ghost"}
              className="flex min-h-11 w-full items-center justify-start gap-3"
            >
              <LogOutIcon className="size-4" />
              Sair da conta
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
