"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getSubjectsById(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    // Fetch group along with users in a single query
    const group = await db.group.findUnique({
      where: { id },
      include: {
        users: {
          include: { user: true },
        },
      },
    });

    if (!group) throw new Error("Group not found");

    return group;
  } catch (error) {
    console.error("Error fetching subject:", error.message);
    throw new Error("Failed to fetch subject");
  }
}
