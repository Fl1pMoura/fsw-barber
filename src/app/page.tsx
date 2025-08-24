import Image from "next/image";
import BarberCard from "./_components/BarberCard";
import BookingCard from "./_components/BookingCard";
import { Header } from "./_components/Header";
import SearchInput from "./_components/SearchInput";
import ServicesButton from "./_components/ServicesButton";
import { quickSearchOptions } from "./_constants/quickSearchOptions";
import { getBarberShops, getBarberShopsSorted } from "./_dal/get-barberShops";
import { getConfirmedBookings } from "./_dal/get-bookings";
import { auth } from "./_lib/auth";
// TODO: AJUSTAR CAMINHO DO BOTÃO
const Home = async () => {
  const barberShops = await getBarberShops();
  const barberShopsSorted = await getBarberShopsSorted();
  const bookings = await getConfirmedBookings();
  const user = await auth();

  return (
    <>
      <Header />
      <main className="px-5">
        <div className="py-6">
          <h1 className="mb-1 text-xl">
            {user?.user?.name && (
              <>
                Olá, <strong>{user?.user?.name}</strong>
              </>
            )}
            {!user?.user?.name && (
              <>
                <strong>Faça seu login para reservar um horário.</strong>
              </>
            )}
          </h1>
          <p className="text-sm">Sexta, 2 de Fevereiro</p>
        </div>
        <div className="mb-6">
          <SearchInput />
        </div>
        <div className="no-scrollbar mb-6 flex items-center gap-3 overflow-auto">
          {quickSearchOptions.map((item) => (
            <ServicesButton
              key={item.label}
              item={{
                label: item.label,
                imageUrl: item.imageUrl,
              }}
            />
          ))}
        </div>
        <div className="relative h-[150px] w-full overflow-clip rounded-[10px]">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src={"/banner-home.png"}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-6">
          <h5 className="mb-3 text-xs font-bold uppercase text-gray-300">
            Agendamentos
          </h5>
          <div className="no-scrollbar flex gap-3 overflow-x-auto">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h5 className="mb-3 text-xs font-bold uppercase text-gray-300">
            Recomendados
          </h5>
          <div className="no-scrollbar flex gap-4 overflow-x-auto">
            {barberShops.map((barberShop) => (
              <BarberCard
                key={barberShop.id}
                name={barberShop.name}
                address={barberShop.address}
                imageUrl={barberShop.imageUrl}
                id={barberShop.id}
              />
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h5 className="mb-3 text-xs font-bold uppercase text-gray-300">
            Populares
          </h5>
          <div className="no-scrollbar flex gap-4 overflow-x-auto">
            {barberShopsSorted.map((barberShop) => (
              <BarberCard
                key={barberShop.id}
                name={barberShop.name}
                address={barberShop.address}
                imageUrl={barberShop.imageUrl}
                id={barberShop.id}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
