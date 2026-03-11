'use server'

import prisma from '../lib/prisma'

export async function getUserRole(uid: string): Promise<string | null> {
  if (!uid) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: uid },
      select: { role: true },
    });
    return user?.role || null;
  } catch (error) {
    console.error("Failed to fetch user role:", error);
    return null;
  }
}
