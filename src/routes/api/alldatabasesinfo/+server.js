import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";

export async function POST({ request }) {
  try {
    let data = await request.json();

    let dt = await Client.db().admin().listDatabases();
    const dataString = JSON.stringify(dt);

    return json(dt);
  } catch (e) {
    console.log(e);
    throw error(400, e);
  }
}
