import { start_mongo } from "$db/Mongo.js";
const APPHOOK = {
  init: () => {
    APPHOOK.RunMongo();
  },
  RunMongo: async () => {
    try {
      await start_mongo();
      console.log("mongoo hooks started");
    } catch (error) {
      console.warn(error);
    }
  },
};
APPHOOK.init();
