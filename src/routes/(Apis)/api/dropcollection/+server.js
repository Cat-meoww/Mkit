import { error, json } from "@sveltejs/kit";
import Client from "$db/Mongo.js";

export async function POST({ request }) {
  try {
    let post = await request.json();

    let Database = post?.db?? "";
    let Collection = post?.collection?? "";

    await validate(Collection);

    let db = await Client.db(Database);
    let response = await db.dropCollection(Collection);

    //console.log("Drop Colletion", { Database, Collection, response });
    return json({ status: true, Database, Collection, response });
  } catch (e) {
    console.log("Create collection", e);
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
      reject("Minimum Length 3 Chars" + collectionname.length);
    }
    resolve();
  });
}
