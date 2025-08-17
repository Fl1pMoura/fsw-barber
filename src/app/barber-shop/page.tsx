import BarberCard from "../_components/BarberCard";
import { Header } from "../_components/Header";
import { db } from "../_lib/prisma";

interface IBarberShopPage {
  searchParams: {
    service: string;
    name: string;
  };
}

const BarberShop = async ({ searchParams }: IBarberShopPage) => {
  console.log(searchParams);

  const barberShops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams.name
          ? {
              name: {
                contains: searchParams.name,
                mode: "insensitive",
              },
            }
          : {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            },
      ],
    },
  });

  return (
    <div>
      <Header />
      <div className="mt-6 px-5">
        <h5 className="mb-3 text-xs font-bold uppercase text-gray-300">
          Resultados para &quot;{searchParams.name || searchParams.service}
          &quot;
        </h5>
        <div className="no-scrollbar flex gap-4 overflow-x-auto">
          {barberShops.map((barberShop) => (
            <BarberCard
              id={barberShop.id}
              key={barberShop.id}
              address={barberShop.address}
              imageUrl={barberShop.imageUrl}
              name={barberShop.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarberShop;
