import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";

export async function POST({ request }) {
  try {
    let post = await request.json();

    let db = post?.db ?? "";
    let collection = post?.collection ?? "";
    let response = await GetDbStatus(db, collection);
    return json({ ok: 1, response });
  } catch (e) {
    console.log(e);
    throw error(400, e);
  }
}

const GetDbStatus = async (dbname = "", collection = "") => {
  const db = await Client.db(dbname);

  let status = await db.command({
    collStats: collection,
    wiredTiger: 0,
    indexDetails: 0,
  });

  return Promise.resolve(status);
};
