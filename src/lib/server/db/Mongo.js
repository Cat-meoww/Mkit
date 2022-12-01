import { MONGODB_URI } from "$env/static/private";
import { MongoClient } from "mongodb";

const client = new MongoClient(MONGODB_URI);
export function start_mongo() {
  console.log("Starting Mongo ...");
  try {
    return client.connect();
  } catch (e) {
    console.error("some fault hapen")
    return false();
  }
}
export default client;
