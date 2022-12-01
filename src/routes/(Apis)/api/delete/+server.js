import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";

export async function GET({ request }) {
  try {
    console.log("Getting Collections");

    let db = await Client.db("learn");

    let response = await db.collection("bbbb...000-{87&12@!~<").drop();
    // let db = await Client.db("sample_weatherdata");

    // let response = await db.collection("test").drop();
    console.log("learn", response);
    if (response) {
      return json({ response });
    } else {
      throw error(400, "Query failed to tried");
    }
  } catch (e) {
    console.log(e);
    throw error(400, e);
  }
}
