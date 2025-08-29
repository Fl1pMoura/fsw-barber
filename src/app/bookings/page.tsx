import { notFound } from "next/navigation";
import BookingCard from "../_components/BookingCard";
import { Header } from "../_components/Header";
import { getConfirmedBookings, getPastBookings } from "../_dal/get-bookings";
import { auth } from "../_lib/auth";

const Bookings = async () => {
  const confirmedBookings = await getConfirmedBookings();
  const pastBookings = await getPastBookings();
  const user = await auth();

  if (!user) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text font-bold">Agendamentos</h2>
            <h5 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-300">
              Confirmados
            </h5>
            <div className="space-y-3">
              {confirmedBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
        {pastBookings.length > 0 && (
          <>
            <h2 className="text font-bold">Agendamentos</h2>
            <h5 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-300">
              Passados
            </h5>
            <div className="space-y-3">
              {pastBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}
        {confirmedBookings.length === 0 && pastBookings.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhum agendamento encontrado.
          </p>
        )}
      </div>
    </>
  );
};

export default Bookings;
