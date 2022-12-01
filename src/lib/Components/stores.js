import { writable } from "svelte/store";
export let sidebar = writable({
  Db: "",
  Collection: "",
  CurrentDataSet: "",
  IsDb: false,
});
//Idk
export let Selected_DB = writable("");

//toggle list and grid in collection
export let IsGrid = writable(false);

//state of new collection modal popup
export let NewCollection = writable(false);
export let NewCollectionData=writable(false);

//state of new database modal popup
export let NewDatabase = writable(false);

//state of Drop collection modal popup
export let DropCollection = writable(false);
export let DropData = writable(false);


//state of Drop Database modal popup
export let DropDb = writable(false);
export let DropDbData = writable(false);

//state of dbpage reload
export let DbPageReload = writable(false);
//state of sidebar reload
export let Reloadsidebar = writable(false);
export let completedReload = writable(false);
//state of navigation collection reload
export let NavCollReload = writable({ state: false, db: false});



// Main data

export let Maindata=writable();
