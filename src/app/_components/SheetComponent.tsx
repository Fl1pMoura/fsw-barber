"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";

import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

import { Calendar1Icon, HomeIcon, LogIn, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";
import { quickSearchOptions } from "../_constants/quickSearchOptions";
import GoogleIcon from "./svgs/googleIcon";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";

const SheetComponent = ({ children }: { children: ReactNode }) => {
  const { data } = useSession();
  function handleSignOut() {
    signOut();
  }
  function handleSignIn() {
    signIn("google");
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b pb-6 text-start">
          <SheetTitle className="mb-8 text-lg font-black">Menu</SheetTitle>
          {data?.user ? (
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
                  <DialogHeader className="">
                    <DialogTitle>Faça login na plataforma</DialogTitle>
                    <DialogDescription className="mt-2 block">
                      Conecte-se usando sua conta do Google
                    </DialogDescription>
                  </DialogHeader>
                  <Button onClick={handleSignIn} variant={"outline"}>
                    <GoogleIcon />
                    Google
                  </Button>
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
            onClick={handleSignOut}
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
