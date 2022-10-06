// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { loginUser } from "../../lib/prismaQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  const response = await loginUser(username, password);

  res.json(response);
}
