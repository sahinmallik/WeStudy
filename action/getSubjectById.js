"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getSubjectsById(id) {
  const { userId } = await auth();

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const subject = await db.subject.findUnique({
      where: {
        id: id,
      },
    });
    return subject;
  } catch (error) {
    console.log("Error getting subject: ", error.message);
    throw new Error(error);
  }
}
