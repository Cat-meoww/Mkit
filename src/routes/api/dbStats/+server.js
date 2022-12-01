import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";

export async function POST({ request }) {
  try {
    let post = await request.json();
    //console.log("POST : ",post)
    let dbname = post?.db ?? "";
    if (dbname !== "local") {
      const db = await Client.db(dbname);

      let response = await db.command({ dbStats: 1, authorized: 1 });
      return json(response);
    }
    return json({ ok: 1 });
  } catch (e) {
    console.log(e);
    throw error(400, e);
  }
}
