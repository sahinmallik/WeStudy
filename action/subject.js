"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function createSubject(data) {
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
    const result = await db.$transaction(async (tx) => {
      const subject = await tx.subject.create({
        data: {
          subjectName: data.name,
          emails: [user.email],
          code: data.code,
          videoUrl: " ",
        },
      });
      return subject;
    });
    return { success: true, ...result };
  } catch (error) {
    console.log("Error creating subject: ", error.message);
    throw new Error(error);
  }
}
