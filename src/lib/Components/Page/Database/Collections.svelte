<script>
  import CollectionCard from "./CollectionCard.svelte";
  import ToggleListGrid from "./ToggleListGrid.svelte";
  import {
    IsGrid,
    DropCollection,
    DropData,
  } from "$Components/stores.js";

  export let collections;
  export let db;

  $: css = $IsGrid ? "flex-row flex-wrap" : "flex-col";

  let Modal = {
    dropCollection: (event) => {
      let data = event.detail;
      console.log(data);
      //Toggle drop collection modal and setting drop data
      $DropCollection = !$DropCollection;
      $DropData = data;
    },
  };
</script>

<ToggleListGrid {db}/>
<div class="list-content mt-4 px-4 pb-2 flex w-full  gap-2 {css}">
  {#each collections as collection, i}
    <CollectionCard {collection} on:dropCollection={Modal.dropCollection} />
  {/each}
</div>
