"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function createGroup(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Fetch user from DB
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(async (tx) => {
      // Create the group
      const group = await tx.group.create({
        data: {
          groupName: data.name,
          tag: data.subjectTag,
          specialization: data.specialization,
          userCount: 1,
          documents: [], // JSON field initialized as empty array
          videoUrl: "",
        },
      });

      // Add user to the group
      await tx.groupAdded.create({
        data: {
          userId: user.id,
          groupId: group.id,
        },
      });

      await tx.groupRecentActivity.create({
        data: {
          groupId: group.id,
          userId: user.id,
          activity: "Group Created By " + user.name,
        },
      });

      await tx.userRecentActivity.create({
        data: {
          userId: user.id,
          activity: "You have Created a Group - " + data.name,
        },
      });

      return group;
    });
    console.log("Group created successfully:", result);
    return { success: true, group: result };
  } catch (error) {
    console.error("Error creating Group:", error);
    throw new Error("Failed to create group");
  }
}
