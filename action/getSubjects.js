"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getSubjects() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    // Fetch user and associated groups in one query
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        groups: {
          include: { group: true },
        },
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error("Error fetching subjects:", error.message);
    throw new Error("Failed to fetch subjects");
  }
}
