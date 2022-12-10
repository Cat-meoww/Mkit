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
    let indexdata = payload.payload;
    if (validateALL(indexdata) === true) {
      let db = await Client.db(database);
      let coll = await db.collection(collection);
      let index = makeorder(indexdata);

      const result = await coll.createIndex(index);
      //console.log(`Index created: ${result}`);
      return new json({ ok: 1, data: result });
    } else {
      throw "Invalid Data";
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
function makeorder(payload) {
  let box = {};
  for (let index = 0; index < payload.length; index++) {
    let field = payload[index]?.indexfield ?? false;
    let paytype = payload[index]?.type ?? false;
    let value = indextype?.[paytype] ?? false;
    if (value !== false) {
      box[field] = value;
    }
  }
  return box;
}
function validateALL(values) {
  if (values.length <= 0) {
    return false;
  }
  for (let index = 0; index < values.length; index++) {
    if (values[index]?.indexfield ?? false) {
    } else {
      return false;
    }
    let indext = values[index]?.type ?? false;
    if (indext) {
      if (indextype?.[indext] ?? false) {
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  console.log("all valid true");
  return true;
}
