<script>
  import Gridicon from "./Icons/Gridicon.svelte";
  import Listicon from "./Icons/Listicon.svelte";
  import { IsGrid, NewCollection, NewCollectionData } from "$Components/stores.js";
  export let db;
  let Toggle = () => {
    $IsGrid = !$IsGrid;
  };
  function createCollection(){
    $NewCollection = !$NewCollection
    $NewCollectionData={db}
  }
</script>

<div class="mt-4 px-4 pb-2 flex flex-row gap-2  justify-between">
  <button
    on:click={createCollection}
    class="cursor-pointer h-9 btn bg-emerald-700 border-none gap-1 normal-case bg-opacity-90 hover:bg-emerald-900 backdrop-blur flex flex-row rounded-md outline-none color center px-3">
    <span>Create collection</span>
  </button>
  <div class="flex flex-row  gap-4">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={Toggle}
      class="w-12 h-12 fill-mongo-white cursor-pointer flex bg-mongodark-100  rounded justify-center items-center">
      <div class="w-6 h-6 ">
        {#if $IsGrid}
          <Gridicon />
        {:else}
          <Listicon />
        {/if}
      </div>
    </div>
  </div>
</div>
