import { error, json } from "@sveltejs/kit";
import Client from "$db/Mongo.js";

export async function POST({ request }) {
  try {
    let post = await request.json();

    let database = post.db.trim();
    let collection = post.collection.trim();

    await validate(database);
    await validate(collection);

    let db = await Client.db(database);
    let response = await db.createCollection(collection);
    return json({ status: true });
  } catch (e) {
    console.log("Create Database API : ", e);
    throw error(400, { status: false, error: e });
  }
}

function validate(collectionname) {
  //validating collection name
  return new Promise((resolve, reject) => {
    if (!collectionname.match(/^[a-zA-Z0-9_]*$/)) {
      reject("Pattern Not Matched");
    }
    if (collectionname.length < 3) {
      reject("Minimum Length 3 Chars");
    }
    resolve();
  });
}
