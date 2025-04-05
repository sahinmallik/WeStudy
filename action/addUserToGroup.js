"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function addUserToGroup(groupId, data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");
  console.log(data);
  try {
    const group = await db.group.findUnique({
      where: {
        id: groupId,
      },
    });
    if (!group) throw new Error("Group not found");

    const userAdding = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    console.log("userAdding", userAdding);
    if (!userAdding) {
      return { success: false, message: "User not found" };
    }
    const existingMember = await db.groupAdded.findFirst({
      where: {
        userId: userAdding.id,
        groupId: group.id,
      },
    });

    if (existingMember) {
      return { success: false, message: "User already a member of the group" };
    }

    const result = await db.$transaction(async (tx) => {
      // Add user to the group
      await tx.groupAdded.create({
        data: {
          userId: userAdding.id,
          groupId: group.id,
        },
      });

      await tx.group.update({
        where: {
          id: group.id,
        },
        data: {
          userCount: group.userCount + 1,
        },
      });

      await tx.groupRecentActivity.create({
        data: {
          groupId: group.id,
          userId: user.id,
          activity: userAdding.name + " Added By " + user.name,
        },
      });

      await tx.userRecentActivity.create({
        data: {
          userId: userAdding.id,
          activity: "You have been added to the Group - " + group.groupName,
        },
      });
      await tx.userRecentActivity.create({
        data: {
          userId: user.id,
          activity:
            "You have added " +
            userAdding.name +
            " to the Group - " +
            group.groupName,
        },
      });

      return { success: true, message: "User added to the group successfully" };
    });
    console.log("result", result.message);
    return result;
  } catch (error) {
    console.error("Error adding user to group:", error);
    throw new Error("Failed to add user to group");
  }
}
