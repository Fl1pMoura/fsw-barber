import BarberCard from "../_components/BarberCard";
import { Header } from "../_components/Header";
import { getBarberShopServices } from "../_dal/get-barberShops";

export interface IBarberShopPage {
  searchParams: {
    service: string;
    name: string;
  };
}

const BarberShop = async ({ searchParams }: IBarberShopPage) => {
  const barberShops = await getBarberShopServices({ searchParams });

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
