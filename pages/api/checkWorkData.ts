import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("MyGym");
  if (req.method == "POST") {
    let data = JSON.parse(req.body);
    console.log(JSON.parse(req.body));
    let result = new Array();

    for (let index = 0; index < data.length; index++) {
      if (data[index] !== "") {
        var val = await db
          .collection("WorkRecord")
          .findOne({ date: data[index] });
        val
          ? result.push({ date: data[index], checker: true })
          : result.push({ date: data[index], checker: false });
      } else {
        result.push({ date: "", checker: false });
      }
    }

    console.log(result);
    res.status(200).json(result);
  }
}
