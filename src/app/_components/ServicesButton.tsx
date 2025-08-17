"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ServicesButtonProps {
  item: {
    label: string;
    imageUrl: React.ReactNode;
  };
}

const ServicesButton = ({ item }: ServicesButtonProps) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(`/barber-shop?service=${item.label}`)}
      key={item.label}
      variant={"secondary"}
      className="py-2. h-fit border border-gray-700 px-4 py-[11px] text-sm font-bold"
    >
      {item.imageUrl}
      {item.label}
    </Button>
  );
};

export default ServicesButton;
