<script>
  import CollectionBar from "./CollectionBar.svelte";
  export let collections = [];
  export let db;
  import {
    DropCollection,
    DropData,
  } from "$Components/stores.js";
  let Modal = {
    dropCollection: (event) => {
      let data = event.detail;
      console.log("event disaptch",data);
      $DropCollection = !$DropCollection;
      $DropData = data;
    },
  };
</script>


<ul class="menu p-0">
  {#each collections as collection}
    <CollectionBar  db={db} collection={collection.name} on:dropCollection={Modal.dropCollection} type={collection.type} />
  {/each}
</ul>
