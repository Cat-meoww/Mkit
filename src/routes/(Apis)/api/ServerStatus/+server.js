import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";

export async function POST({ request }) {
    
  try {
    console.log("Getting Collections");
    let db=await Client.db('admin');
    let response = await db.command({
     ismaster:1
   });
    if(response){
      return json(response);
    }else{
      throw error(400, "Query failed to tried");
    }
  } catch (e) {
    console.log("Server Status",e);
    throw error(400, e);
  }
}
