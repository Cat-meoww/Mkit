import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";
import { MongoServerError } from "mongodb";
import { ObjectId } from "mongodb";

const LIMIT = 10;

export async function POST({ request }) {
  try {
    console.log("Delete req");
    let payload = await request.json();
    let database = payload.db;
    let collection = payload.collection;
    let _id = payload._id;

    console.log(database);
    let db = await Client.db(database);
    let coll = await db.collection(collection);

    var objectReg = new RegExp("^[0-9a-fA-F]{24}$");
    let filter;
    if (ObjectId.isValid(_id)) {
      filter = { $or: [{ _id: _id }, { _id: new ObjectId(_id) }] };
    } else {
      filter = { _id };
    }

    console.log(filter);

    let deleteone = await coll.deleteOne(filter);

    return json({ status: true, deleteone });
  } catch (e) {
    if (e instanceof MongoServerError) {
      throw error(400, {
        error: true,
        type: "mongo",
        msg: `${e}`,
      });
    }
    console.log(e);
    throw error(400, { error: true, msg: e });
  }
}
function isJSON(data) {
  try {
    if (typeof data === "object") {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(data);
    return false;
  }
}
