import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";

const LIMIT = 10;

export async function POST({ request }) {
  try {
    let OPCOUNT = "count" + crypto.randomUUID();
    console.log(OPCOUNT);
    console.log("Try find");
    let payload = await request.json();
    let database = payload.db;
    let collection = payload.collection;
    let filter = payload?.filter ?? {};

    console.log(database);
    let db = await Client.db(database);
    let coll = await db.collection(collection);

    if (isJSON(filter)) {
      let Option = GetOptions(payload);

      let pipeline = GetTotalAggegation(payload, OPCOUNT);
      let cursor = await coll.aggregate(pipeline);
      let count = await cursor.toArray();
      await cursor.close();

      if (0 in count) {
        const { [OPCOUNT]: countid } = count[0];
        // applogic
        let app_pipeline = GetAgg(payload);
        console.log(app_pipeline);
        let APP_cursor = await coll.aggregate(app_pipeline).toArray();
        return json({ Total: countid, data: APP_cursor });
      } else {
        return json({ Total: 0, data: [] });
      }
    } else {
      throw error(400, "Error filter input" + typeof filter);
    }
  } catch (e) {
    console.log(e);
    throw error(400, e);
  }
}

function isJSON(data) {
  try {
    if (typeof data === "object") {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(data);
    return false;
  }
}

function GetOptions(payload) {
  let limit = convert2int(payload?.limit ?? 0);
  let skip = convert2int(payload?.skip ?? 0);
  return {
    limit,
    skip,
  };
}
function GetTotalAggegation(payload, OPCOUNT) {
  let limit = convert2int(payload?.limit ?? 0);
  let skip = convert2int(payload?.skip ?? 0);
  let filter = payload?.filter ?? {};
  let agg = [
    {
      $match: filter,
    },
  ];
  if (skip > 0) {
    agg.push({
      $skip: skip,
    });
  }
  if (limit > 0) {
    agg.push({
      $limit: limit,
    });
  }

  agg.push({
    $count: OPCOUNT,
  });

  return agg;
}
function GetAgg(payload) {
  let limit = convert2int(payload?.limit ?? 0);
  let skip = convert2int(payload?.skip ?? 0);
  let filter = payload?.filter ?? {};

  let APPSKIP = convert2int(payload?.APPSKIP ?? 0);
  let agg = [
    {
      $match: filter,
    },
  ];

  if (skip > 0) {
    agg.push({
      $skip: skip,
    });
  }
  if (limit > 0) {
    agg.push({
      $limit: limit,
    });
  }
  console.log(LIMIT);
  //application logic

  if (APPSKIP > 0) {
    agg.push({
      $skip: APPSKIP,
    });
  }
  if (LIMIT > 0) {
    agg.push({
      $limit: LIMIT,
    });
  }
  return agg;
}
function convert2int(data) {
  data = parseInt(data);
  if (!isNaN(data)) {
    return data;
  }
  return 0;
}
