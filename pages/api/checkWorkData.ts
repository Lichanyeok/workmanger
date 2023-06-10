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

    for (let index = 0; index < data.dates.length; index++) {
      if (data.dates[index] !== "") {
        var val = await db
          .collection("WorkRecord")
          .findOne({ date: data.dates[index], email: data.email });
        val
          ? result.push({ date: data.dates[index], checker: true })
          : result.push({ date: data.dates[index], checker: false });
      } else {
        result.push({ date: "", checker: false });
      }
    }
    res.status(200).json(result);
  }
}
