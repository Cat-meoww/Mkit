import { error } from "@sveltejs/kit";

import { json } from "@sveltejs/kit";

import Client from "$db/Mongo.js";

export async function POST({ request }) {
  try {
    console.log("Getting Collections");
    let data = await request.json();
    // log all fields
    //console.log(data.database);
    let database=data.database;
    console.log(database);
    let db=await Client.db(database);
    // let collections=await db.listCollections({},{ nameOnly: true }).toarray();
    //console.log(await JSON.stringify(collections));
    let response=await db.command({ listCollections: 1.0, nameOnly: true });
    if(response.ok){
      
      return json(response.cursor.firstBatch);
    }else{
      throw error(400, "Query failed to tried");
    }
    
    
    
  } catch (e) {
    console.log(e);
    throw error(400, e);
  }
  //console.log("Getcollections", { ok: 1 });
  
}
