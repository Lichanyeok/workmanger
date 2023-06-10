import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("MyGym");
  if (req.method === "POST") {
    let body = JSON.parse(req.body);
    console.log(typeof body._id);
    if (body._id === undefined || body._id === null) {
      db.collection("WorkRecord").insertOne(body);
    } else {
      let data = {
        title: body.title,
        date: body.date,
        works: body.works,
        email: body.email,
      };
      let result = await db
        .collection("WorkRecord")
        .updateOne({ _id: new ObjectId(body._id) }, { $set: data });
      res.status(200).json(result);
    }
  }
}
