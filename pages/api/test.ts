import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function habndler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("MyGym");
  if (req.method === "GET") {
    let result = await db.collection("WorkRecord").find().toArray();

    res.status(200).json(result);
  }
}
