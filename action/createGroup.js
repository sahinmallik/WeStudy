"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function createGroup(data) {
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
  console.log(data);
  try {
    const result = await db.$transaction(async (tx) => {
      const group = await tx.group.create({
        data: {
          groupName: data.name,
          tag: data.subjectTag,
          specialization: data.specialization,
        },
      });
      const addUser = await tx.groupAdded.create({
        data: {
          user: { connect: { id: user.id } },
          group: { connect: { id: group.id } },
        },
      });
      return [group, addUser];
    });
    return { success: true, ...result };
  } catch (error) {
    console.log("Error creating Group: ", error.message);
    throw new Error(error);
  }
}
