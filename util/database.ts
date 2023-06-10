import { MongoClient } from "mongodb";

const DB_URI = process.env.MONGODB_URI || "";
const options: any = { useNewUrlParser: true };
let connectDB: any;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(DB_URI, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(DB_URI, options).connect();
}
export { connectDB };
