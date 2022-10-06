// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
    if (err) res.json({ success: false, err });

    res.json({
      decoded,
      success: true,
    });
  });
}
