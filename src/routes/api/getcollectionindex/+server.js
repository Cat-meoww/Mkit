import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";

export async function POST({ request }) {
  try {
    console.log("Getting Collections");
    let data = await request.json();

    let Database = data.Database;
    let Collection = data.Collection;

    let db = await Client.db(Database);

    let response = await db.command({ collStats: Collection, scale: 1 });
    if (response.ok) {
      return json(response);
    } else {
      throw error(400, "Query failed to tried");
    }
    //{ dbStats:1, scale:1 }
    //{ collStats:"blog.posts" , scale : 1 }
  } catch (e) {
    console.log(e);
    throw error(400, e);
  }
  
}
