"use server";

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface IGetBookingsProps {
  date: Date;
}

export const getConfirmedBookings = () => {
  return db.booking.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: { barbershop: true },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
};

export const getPastBookings = () => {
  return db.booking.findMany({
    where: {
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: { barbershop: true },
      },
    },
  });
};

export const getBookings = ({ date }: IGetBookingsProps) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
    include: {
      service: {
        include: { barbershop: true },
      },
    },
  });
};
