import { prisma } from "./prisma";
import { ThoughtForm } from "../interfaces/IThoughtForm";
import Thought from "../interfaces/IThought";

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
    const user = await prisma.user.findFirstOrThrow({
      where: {
        username,
        password,
      },
    });

    return {
      user,
      success: true,
    };
  } catch (error) {
    return {
      error,
      success: false,
    };
  }
}

/**
 * It creates a thought and returns the thought created
 * @param {ThoughtForm}  - Thought -&gt; { tag: string, title: string, body: string }
 * @param {string} username - string
 * @returns An object with an error and a success property.
 */
export async function createThought(
  { tag, title, body }: ThoughtForm,
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

/**
 * It fetches all the thoughts from the database and returns them.
 * @returns An object with a thoughts property and a value of an array of thoughts.
 */
export async function fetchThoughts() {
  try {
    const thoughts = await prisma.thought.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { thoughts };
  } catch (error) {
    return { error, success: false };
  }
}

type query = string | string[] | undefined;
/**
 * Fetch a thought by its id and return the user and thought objects.
 * @param {query} userId - query, thoughtId: query
 * @param {query} thoughtId - query
 * @returns { user, thought }
 */
export async function fetchThought(userId: query, thoughtId: query) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
      select: {
        username: true,
      },
    });

    const thought = await prisma.thought.findFirst({
      where: {
        id: Number(thoughtId),
      },
    });

    return {
      user,
      thought,
    };
  } catch (error) {
    return { error, success: false };
  }
}

/**
 * It takes a thoughtId and a data object as arguments, and then updates the thought with the given
 * thoughtId with the data object
 * @param {number} thoughtId - number - The id of the thought you want to update
 * @param {Thought} data - Thought
 * @returns An object with two properties:
 * 1. updatedThought: The updated thought
 * 2. success: A boolean indicating whether the update was successful
 */
export async function updateThought(thoughtId: number, data: Thought) {
  try {
    const updatedThought = await prisma.thought.update({
      where: {
        id: thoughtId,
      },
      data: {
        tag: data.tag,
        title: data.title,
        body: data.body,
      },
    });

    return {
      updatedThought,
      success: true,
    };
  } catch (error) {
    return {
      error,
      success: false,
    };
  }
}

/**
 * It deletes a thought from the database and returns an object with a boolean value of success and
 * either the deleted thought or an error.
 * @param {number} thoughtId - number - The id of the thought you want to delete
 * @returns An object with two properties: deletedThought and success.
 */
export async function deleteThought(thoughtId: number) {
  try {
    const deletedThought = await prisma.thought.delete({
      where: {
        id: thoughtId,
      },
    });

    return {
      deletedThought,
      success: true,
    };
  } catch (error) {
    return {
      error,
      success: false,
    };
  }
}
