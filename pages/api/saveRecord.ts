import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("MyGym");
  if (req.method === "POST") {
    let body = JSON.parse(req.body);
    if (body._id === undefined || body._id === null) {
      db.collection("WorkRecord").insertOne(body);
    } else {
      db.collection("WorkRecord").updateOne({ _id: body._id }, { $set: body });
    }
  }
}
