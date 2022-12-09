import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";
import { MongoServerError } from "mongodb";

const LIMIT = 10;

export async function POST({ request }) {
  try {
    
    let payload = await request.json();
    let database = payload.db;
    let collection = payload.collection;

    let db = await Client.db(database);
    let cursor = await db.collection(collection);
    let indexesinfo = await cursor.indexInformation();
    let indexes = await cursor.indexes();

    return new json({ ok: 1, data: { indexes, indexesinfo } });
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
