import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";
import { MongoServerError } from "mongodb";

export async function POST({ request }) {
  try {
    console.log("Insert New");
    let payload = await request.json();
    let database = payload.db;
    let collection = payload.collection;
    let doc = payload.doc;

    let db = await Client.db(database);
    let coll = await db.collection(collection);
    let result;
    if (Array.isArray(doc)) {
        await isArrayofobjects(doc)
        result=await coll.insertMany(doc);
    } else if (typeof doc === "object") {
        result=await coll.insertOne(doc);
    }

   

    return json({ status: true, result });
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
function isArrayofobjects(array) {
  return new Promise((resolve, reject) => {
    for (var i = 0; i < array.length; i++) {
      if (Object.prototype.toString.call(array[i]) !== "[object Object]") {
         reject("Not a an object");
        break;
       
      }
    }
    resolve(true);
  });

}
