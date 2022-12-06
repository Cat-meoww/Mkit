<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";
  export let dataset;
  export let db;
  export let collection;
  import Onheader from "./Collection/Onheader.svelte";
  import Tabs from "./Collection/Tabs.svelte";
  import TabsContainer from "./Collection/Tabs/TabsContainer.svelte";
  let props = {
    docs: 0,
    index: 0,
  };
  async function IndexInfo(data = { Database: "", Collection: "" }) {
    try {
      const options = {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("/api/getcollectionindex", options);
      const responseobj = await response.json();
      console.log(responseobj);
      props.index = responseobj.nindexes;
      props.docs = responseobj.count;
    } catch (e) {
      console.error(e);
    }
  }
  
  //Default
  let CurrentTab="Documents";
  onMount(() => {
    let data = { Database: db, Collection: collection };
    IndexInfo(data);
    console.log("Onmount");
  });
  $: console.log('CurrentTab', CurrentTab);
  // onDestroy(() => {
  //   console.log("onDestroy");
  // });
  // beforeUpdate(() => {
  //   //load();
  //   console.log("beforeUpdate");
  //   // load();
  // });
  // afterUpdate(() => {
  //   console.log("afterUpdate");
  // });
</script>

<div class="flex flex-col">
  <Onheader {db} {collection} {...props} />
  <Tabs bind:CurrentTab={CurrentTab} />
  <TabsContainer {db} {collection} {dataset} {CurrentTab}/>
  <div class="flex offheader" />
</div>
<!-- <h1>DataSet {dataset}</h1> -->
