import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";
import { MongoServerError } from "mongodb";

const LIMIT = 10;

export async function POST({ request }) {
  try {
    let OPCOUNT = "count" + crypto.randomUUID();
    let payload = await request.json();
    let database = payload.db;
    let collection = payload.collection;
    let Agg = payload?.Pipeline ?? [{}];

    let db = await Client.db(database);
    let coll = await db.collection(collection);
    await validate(Agg);
    let CODE_AGG = GetTotalAggegation(payload, OPCOUNT);
    console.log("count stage", CODE_AGG);
    let cursor = await coll.aggregate(CODE_AGG);
    let count = await cursor.toArray();
    await cursor.close();
    if (0 in count) {
      const { [OPCOUNT]: countid } = count[0];
      console.log({ countid }, { payload });
      // applogic
      let app_pipeline = GetAgg(payload);
      console.log("App pipeline", app_pipeline);
      let APP_cursor = await coll.aggregate(app_pipeline).toArray();
      return json({ Total: countid, data: APP_cursor });
    } else {
      return json({ Total: 0, data: [] });
    }

    return new json({ op: 1 });
  } catch (e) {
    console.log("aggregate error:", e);
    if (e instanceof MongoServerError) {
      throw error(400, {
        error: true,
        type: "mongo",
        msg: `${e}`,
      });
    }
    throw error(400, { error: true, msg: e });
  }
}

function GetTotalAggegation(payload, OPCOUNT) {
  let pipeline = payload?.Pipeline ?? [];
  let agg = [
    ...pipeline,
    {
      $count: OPCOUNT,
    },
  ];

  return agg;
}
async function validate(Pipeline) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(Pipeline)) {
      console.log("I array");
      for (var i = 0; i < Pipeline.length; i++) {
        if (Object.prototype.toString.call(Pipeline[i]) !== "[object Object]") {
          return reject("Invalid Stage");
          break;
        }
      }
      return resolve(true);
    }
    return reject("Invalid Pipeline");
  });
}
function IsemptyObject(obj) {
  if (
    obj &&
    Object.keys(obj).length &&
    Object.getPrototypeOf(obj) === Object.prototype
  ) {
    return true;
  }
  return false;
}
function GetAgg(payload) {
  console.log("get after");
  let pipeline = payload?.Pipeline ?? [];

  let APPSKIP = convert2int(payload?.APPSKIP ?? 0);
  let agg = pipeline;
  console.log(pipeline);

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
