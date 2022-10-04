import { prisma } from "./prisma";

export async function checkUsername(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  // not valid if prisma returned a user
  if (user?.username) {
    return false;
  }
  return true;
}

export async function addUser(username: string, password: string) {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    return user;
  } catch (error) {
    return {
      success: false,
    };
  }
}
