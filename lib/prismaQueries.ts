import { prisma } from "./prisma";
import Thought from "../interfaces/IThoughts";

/**
 * If a user is found with the username, return false, otherwise return true.
 * @param {string} username - string - the username to check
 * @returns A boolean.
 */
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

/**
 * It creates a new user in the database with the username and password provided.
 * @param {string} username - string, password: string
 * @param {string} password - string
 * @returns The user object or an object with a success property set to false.
 */
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

/**
 * It takes a username and password, and returns a user object if the username and password match, or
 * an error object if they don't
 * @param {string} username - string, password: string
 * @param {string} password - string
 * @returns An object with a success property and an error property.
 */
export async function loginUser(username: string, password: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });

    return user;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

/**
 * It creates a thought and returns the thought created
 * @param {Thought}  - Thought -&gt; { tag: string, title: string, body: string }
 * @param {string} username - string
 * @returns An object with an error and a success property.
 */
export async function createThought(
  { tag, title, body }: Thought,
  username: string
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    const thought = await prisma.thought.create({
      data: {
        userId: user?.id,
        tag,
        title,
        body,
      },
    });

    return thought;
  } catch (error) {
    return {
      error,
      success: false,
    };
  }
}

export async function fetchThoughts() {
  try {
    const thoughts = await prisma.thought.findMany();

    return { thoughts };
  } catch (error) {
    return { error, success: false };
  }
}
