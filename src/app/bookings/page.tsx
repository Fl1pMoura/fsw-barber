import BookingCard from "../_components/BookingCard";
import { Header } from "../_components/Header";
import { getConfirmedBookings, getPastBookings } from "../_dal/get-bookings";

const Bookings = async () => {
  const confirmedBookings = await getConfirmedBookings();
  const pastBookings = await getPastBookings();
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <h2 className="text font-bold">Agendamentos</h2>
        <h5 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-300">
          Confirmados
        </h5>
        <div className="space-y-3">
          {confirmedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
        <h5 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-300">
          Passados
        </h5>
        <div className="space-y-3">
          {pastBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookings;
