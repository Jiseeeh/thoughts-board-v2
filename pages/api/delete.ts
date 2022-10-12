// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { deleteThought } from "../../lib/prismaQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { thoughtId } = req.body;

  const response = await deleteThought(thoughtId);

  res.json(response);
}
