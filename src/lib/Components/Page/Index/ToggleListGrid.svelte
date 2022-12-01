<script>
  import Gridicon from "../Database/Icons/Gridicon.svelte";
  import Listicon from "../Database/Icons/Listicon.svelte";
  import { IsGrid, NewDatabase } from "$Components/stores.js";
  
  let Toggle = () => {
    $IsGrid = !$IsGrid;
  };
  function createDatabase(){
    //modal init
    $NewDatabase = true
  }
</script>

<div class="mt-4 px-4 pb-2 flex flex-row gap-2  justify-between">
  <button
    on:click={createDatabase}
    class="cursor-pointer h-9 btn bg-emerald-700 border-none gap-1 normal-case bg-opacity-90 hover:bg-emerald-900 backdrop-blur flex flex-row rounded-md outline-none color center px-3">
    <span>Create Database</span>
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
