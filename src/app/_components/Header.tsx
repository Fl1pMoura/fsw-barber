"use client";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SheetComponent from "./SheetComponent";
import { Button } from "./ui/button";

export const Header = () => {
  const router = useRouter();
  return (
    <header className="flex cursor-pointer items-center justify-between border-b border-solid border-border px-6 py-5">
      <Image
        onClick={() => router.push("/")}
        alt="FSW Barber"
        src={"/logo.png"}
        width={130}
        height={22}
      />

      <SheetComponent>
        <Button size={"icon"} variant={"ghost"} className="size-10">
          <MenuIcon size={5} />
        </Button>
      </SheetComponent>
    </header>
  );
};
