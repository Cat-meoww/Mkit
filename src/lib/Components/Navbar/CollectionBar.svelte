<script>
  import {
    sidebar
  } from "$Components/stores.js";
  //event dispather
  import {
    createEventDispatcher
  } from "svelte";
  import Bin from "$Components/Page/Database/Icons/Bin.svelte";
  const dispatch = createEventDispatcher();
  export let collection;
  export let type;
  export let db;
  let status = false;
  let dataset = db + "." + collection;

  function SelectedSet() {
    $sidebar.CurrentDataSet = dataset;
    $sidebar.Db = db;
    $sidebar.Collection = collection;
    $sidebar.IsDb = false;
    console.log("Store Items", $sidebar);

    dispatch("CollectionChange", {
      status: true,
      to: collection,
    });
  }
  $: status = $sidebar.CurrentDataSet === dataset;

  let hovering = {
    state: "",
    enter: () => {
      hovering.state = true;
    },
    leave: () => {
      hovering.state = false;
    },
    dropCollection: () => {
      console.log("dkdkd");
      dispatch("dropCollection", {
        collection,
        db,
      });
    },
  };
</script>

{#if type === "collection"}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <li
    data-set={dataset}
    on:mouseenter={hovering.enter}
    on:mouseleave={hovering.leave}
    on:click={SelectedSet}>
    <div
      class="flex gap-1 hover:bg-base-300 justify-center items-center"
      class:active={status}>
      <span class="h-5 w-5" />
      <span class="h-5 w-5 flex justify-center"
        ><i class="ri-folder-fill" /></span>
      <span class="flex-1 capitalize">{collection}</span>
      {#if hovering.state}
        <button on:click|stopPropagation={hovering.dropCollection}
          class="flex-0 flex justify-center items-center w-5 h-5 capitalize hover:bg-mongo-card-btnborder rounded-full transition-colors duration-100 hover:fill-mongo-white fill-white">
          <span class="" title="Drop Collection"><Bin /></span></button>
      {/if}
    </div>
  </li>
{/if}

<style>
  .active {
    background-color: #575b5c;
  }
</style>