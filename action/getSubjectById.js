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
    const group = await db.group.findUnique({
      where: {
        id: id,
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });
    // console.log("group", group);
    return group;
  } catch (error) {
    console.log("Error getting subject: ", error.message);
    throw new Error(error);
  }
}
