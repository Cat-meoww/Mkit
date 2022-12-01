<script>
  import DatabaseCard from "./DatabaseCard.svelte";
  import ToggleListGrid from "./ToggleListGrid.svelte";
  import { IsGrid, DropDb, DropDbData } from "$Components/stores.js";
   import {Sortbyname} from "$Components/helper.js";

  export let dbs;
  dbs.sort(Sortbyname);
  //   console.log(dbs);
  $: css = $IsGrid ? "flex-row flex-wrap" : "flex-col";

  let Modal = {
    dropDatabase: (event) => {
      let data = event.detail;

      //Toggle drop database modal and setting drop data
      $DropDb = true;
      $DropDbData = data;
    },
  };
</script>

<ToggleListGrid />
<div class="list-content mt-4 px-4 pb-2 flex w-full  gap-2 {css}">
  {#each dbs as db, i}
    <DatabaseCard {db} on:dropDatabase={Modal.dropDatabase} />
  {/each}
</div>
