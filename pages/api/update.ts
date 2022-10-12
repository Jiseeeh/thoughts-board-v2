// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { updateThought } from "../../lib/prismaQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { thoughtId, thought } = req.body;

  const response = await updateThought(thoughtId, thought);

  res.json(response);
}
