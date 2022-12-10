import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";
import { MongoServerError } from "mongodb";
const indextype = {
  ASC: 1,
  DESC: -1,
  TEXT: "text",
  GEOSPATIAL: "2dsphere",
};

export async function POST({ request }) {
  try {
    let payload = await request.json();
    let database = payload.db;
    let collection = payload.collection;
    let indexname = payload.indexname;
    if (typeof indexname == "string") {
      let db = await Client.db(database);
      let coll = await db.collection(collection);

      const result = await coll.dropIndex(indexname);
      return new json({ ok: 1, data: result });
    } else {
      throw "Invalid data";
    }
  } catch (e) {
    console.log("erroro", e);
    if (e instanceof MongoServerError) {
      throw error(400, {
        error: true,
        type: "mongo",
        msg: `${e}`,
      });
    }
    throw error(400, { error: true, msg: e });
  }
}
