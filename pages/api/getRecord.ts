import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("MyGym");
  if (req.method == "POST") {
    let body = JSON.parse(req.body);
    let date = body.date;
    console.log("getRecord date : " + date);
    let result = await db
      .collection("WorkRecord")
      .findOne({ date: date, email: body.email });
    res.status(200).json(result);
  }
}
