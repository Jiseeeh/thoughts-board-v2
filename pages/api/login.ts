// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { loginUser } from "../../lib/prismaQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  const response = await loginUser(username, password);

  if (!response.success)
    res.send({
      message: "No user found!",
      success: false,
    });

  // sign the user
  jwt.sign({ ...response }, process.env.SECRET, (err, token) => {
    if (err) res.status(400);

    res.json({
      ...response,
      token,
    });
  });
}
