import type { NextApiRequest, NextApiResponse } from "next";

import { createThought } from "../../lib/prismaQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, username } = req.body;

  const response = await createThought(data, username);

  if (response) res.json({ response, success: true });
  else res.json({ message: "something happened", success: false });
}
