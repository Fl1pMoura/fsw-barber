import { Input } from "@/_components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import BookingCard from "./_components/BookingCard";
import { Header } from "./_components/Header";
import { Button } from "./_components/ui/button";
// TODO: AJUSTAR CAMINHO DO BOTÃO
const Home = () => {
  return (
    <>
      <Header />
      <main className="px-5">
        <div className="py-6">
          <h1 className="mb-1 text-xl">
            Olá, Felipe <strong>Faça seu Login</strong>
          </h1>
          <p className="text-sm">Sexta, 2 de Fevereiro</p>
        </div>
        <div className="mb-6 flex items-center gap-2">
          <Input placeholder="Buscar" />
          <Button className="h-9 w-10">
            <SearchIcon size={5} />
          </Button>
        </div>
        <div className="relative h-[150px] w-full overflow-clip rounded-[10px]">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src={"/banner-home.png"}
            fill
            objectFit="cover"
          />
        </div>
        <div className="mt-6">
          <h5 className="mb-3 text-xs font-bold uppercase text-gray-300">
            Agendamentos
          </h5>
          <BookingCard
            status="Confirmado"
            service="Corte de cabelo"
            imageUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
            barberShopName="Barbearia FSW"
          />
        </div>
        <div className="mt-6">
          <h5 className="mb-3 text-xs font-bold uppercase text-gray-300">
            Recomendados
          </h5>
        </div>
      </main>
    </>
  );
};

export default Home;
