import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";

export async function POST({ request }) {
  try {
    let post = await request.json();
    //console.log("POST : ",post)
    let db = post?.db??'';
    let response = await GetDbStatus(db);
    return json(response);
  } catch (e) {
    console.log(e);
    throw error(400, e);
  }
}

const GetDbStatus = async (dbname = "") => {
  const db = await Client.db(dbname);
  const Collections = db.command({ listCollections: 1.0, nameOnly: true });
  let status = db.command({ dbStats: 1 });
  let [stat, coll] = await Promise.all([status, Collections]);
  let response = {
    status: stat,
    collections: coll.cursor,
  };
  return response;
};
