"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getSubjects() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  try {
    const subjects = await db.subject.findMany({
      where: {
        emails: {
          has: user.email,
        },
      },
    });
    return subjects;
  } catch (error) {
    console.log("Error getting subjects: ", error.message);
    throw new Error(error);
  }
}
