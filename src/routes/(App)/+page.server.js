/** @type {import('./$types').PageServerLoad} */
import Client from "$db/Mongo.js";
import { json } from "@sveltejs/kit";
export async function load() {
  return {
    datalist: DatabaseList(Client),
  };
}
const DatabaseList = async (Client) => {
  try {
    let dt = await Client.db().admin().listDatabases();
    const dataString = JSON.stringify(dt);
    console.log("hello");
    return dataString;
  } catch (e) {
    console.error("server error", e);
    return { ok: 0 };
  }
};

