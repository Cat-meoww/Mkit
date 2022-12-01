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
    // console.log({dataString})
    // //const parsed = JSON.parse(dt);
    // console.log(dt.databases);
    return dataString;
  } catch (e) {
    console.error("server error", e);
    return { ok: 0 };
  }
};
const DumpData = async (Client) => {
  let cursorDatabase = await Client.db().admin().listDatabases();
  let Databases = cursorDatabase.databases;
  let store = [];
  await Databases.forEach(async (item) => {
    let db = item.name;
    console.log("DB =", item.name);
    store[db] = await Client.db(db).listCollections();
    // await Client.db(db).listCollections();
    //console.log("|----> ", collection);
  });
  return store;
};
