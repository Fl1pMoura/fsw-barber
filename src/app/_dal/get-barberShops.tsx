"use server";

import { db } from "../_lib/prisma";
import { IBarberShopPage } from "../barber-shop/page";

export const getBarberShops = () => {
  return db.barbershop.findMany();
};

export const getBarberShopsSorted = () => {
  return db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const getBarberShopById = (barberShopId: string) => {
  return db.barbershop.findUnique({
    where: {
      id: barberShopId,
    },
    include: {
      services: true,
    },
  });
};

export const getBarberShopServices = ({ searchParams }: IBarberShopPage) => {
  return db.barbershop.findMany({
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
};
