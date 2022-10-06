// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { addUser } from "../../lib/prismaQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  const response = await addUser(username, password);

  jwt.sign({ ...response }, process.env.SECRET, (err, token) => {
    if (err) res.status(400);
    res.json({
      ...response,
      token,
    });
  });
}
