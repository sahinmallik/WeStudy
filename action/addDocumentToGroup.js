"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function addDocumentToGroup(groupId, data) {
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

    const result = await db.$transaction(async (tx) => {
      // Add document to the group

      const document = await tx.group.update({
        where: {
          id: group.id,
        },
        data: {
          documents: {
            push: data,
          },
        },
      });
      return document;
    });

    return {
      success: true,
      message: "Document added successfully",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}
