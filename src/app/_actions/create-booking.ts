"use server";

import { User } from "@prisma/client";
import { auth } from "../_lib/auth";
import { db } from "../_lib/prisma";

interface CreateBookingParams {
  date: Date;
  serviceId: string;
}

export async function createBooking(data: CreateBookingParams) {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  return db.booking.create({
    data: {
      date: data.date,
      serviceId: data.serviceId,
      userId: (session?.user as User).id,
    },
  });
}
