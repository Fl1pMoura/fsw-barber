"use server";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";
import { auth } from "../_lib/auth";
import { db } from "../_lib/prisma";

interface deleteBookingParams {
  id: string;
}

export async function deleteBooking({ id }: deleteBookingParams) {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  await db.booking.delete({
    where: {
      id,
      userId: (session?.user as User).id,
    },
  });
  revalidatePath("/bookings");
  revalidatePath("/");
}
