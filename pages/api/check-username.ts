import type { NextApiRequest, NextApiResponse } from "next";

import { checkUsername } from "../../lib/prismaQueries";

type Data = {
  isValid: boolean;
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username } = req.body;
  const isValid = await checkUsername(username);

  res.status(200).json({ isValid, username });
}
