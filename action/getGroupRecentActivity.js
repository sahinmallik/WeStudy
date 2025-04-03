"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getGroupRecentActivity(groupId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");

  try {
    const recentActivity = await db.groupRecentActivity.findMany({
      where: {
        groupId: groupId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return recentActivity;
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    throw new Error("Failed to fetch recent activity");
  }
}
