<script>
  import { sidebar, IsGrid } from "../../stores.js";
  import Skeltonloader from "../Database/skeltonloader.svelte";
  import { createEventDispatcher } from "svelte";
  import Bin from "../Database/Icons/Bin.svelte";
  import { readableBytes, Blacklist } from "$Components/helper.js";

  const dispatch = createEventDispatcher();

  export let db;
  let dbname = db?.name ?? false;

  //  Reactive css for list and grid
  $: css = $IsGrid ? "flex-col" : "flex-row";
  $: bodycss = $IsGrid ? "flex-row gap-2" : "flex-col gap-0";
  $: cardcss = $IsGrid ? "min-w-[30%] " : "";

  let Storagesize,
    NoIndexes,
    NoCollections = 0;
  let Onload = async (data) => {
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
      let response = await fetch("/api/dbStats", options);

      let result = await response.json();

      //await new Promise((resolve) => setTimeout(resolve, 1000));

      return new Promise((resolve, reject) => {
        try {
          if (result?.ok ?? false) {
            //console.log(result);
            NoCollections = result?.collections ?? 0;
            Storagesize = readableBytes(result?.storageSize ?? 0);
            NoIndexes = result?.indexes ?? 0;
            return resolve(true);
          }

          return reject("data unable to load");
        } catch (e) {
          return reject(e);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  $: mypromise = Onload({ db: dbname });

  let hovering = {
    state: "",
    enter: () => {
      hovering.state = true;
      // console.log(collectionname, hovering.state);
    },
    leave: () => {
      hovering.state = false;
    },
  };

  let card = {
    database: db?.name ?? false,
    onload: () => {
      return Promise.resolve(true);
    },
    dblclick: async (event) => {
      await card.onload();
      console.log("Card info", card);
      await new Promise((resolve) => {
        if (card.database) {
          $sidebar.IsDb = true;
          $sidebar.Db = card.database;
        }

        return resolve();
      });
    },
    dropDatabase: () => {
      
     
        console.log("Dispatched dropDatabase");
        dispatch("dropDatabase", { db: dbname });
      
    },
  };

  
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:mouseenter={hovering.enter}
  on:mouseleave={hovering.leave}
  on:dblclick={card.dblclick}
  class="card bg-mongodark-100 {cardcss} p-4 cursor-pointer custom-card text-primary-content border border-mongodark-200">
  <div
    class="title flex items-center justify-between  text-mongo-100 font-semibold text-base pt-0.5 mb-4">
    <span class="h-7 ">{db?.name ?? "NA"}</span>

    {#if hovering.state}
      <div
        on:click|stopPropagation={card.dropDatabase}
        class="w-7 h-7 transition-colors ease-in-out hover:bg-mongo-card-hoverbg  flex items-center justify-center border-none rounded-full   fill-mongo-icon">
        <Bin />
      </div>
    {/if}
  </div>
  <div class="body w-full overflow-hidden flex  gap-2 {css}">
    <div
      class="flex  flex-1   overflow-hidden whitespace-normal text-ellipsis  {bodycss}">
      <div class="subtitle font-bold text-sm">Storage size:</div>
      <div class="subbody  font-normal text-sm">
        {#await mypromise}
          <Skeltonloader eclass="mt-2" />
        {:then ok}
          {Storagesize}
        {:catch}
          <Skeltonloader eclass="mt-2" />
        {/await}
      </div>
    </div>
    <div
      class="flex  flex-1   overflow-hidden whitespace-normal text-ellipsis  {bodycss}">
      <div class="subtitle font-bold text-sm">Collections:</div>
      <div class="subbody  font-normal text-sm">
        {#await mypromise}
          <Skeltonloader eclass="mt-2" />
        {:then ok}
          {NoCollections}
        {:catch}
          <Skeltonloader eclass="mt-2" />
        {/await}
      </div>
    </div>

    <div
      class="flex  flex-1   overflow-hidden whitespace-normal text-ellipsis  {bodycss}">
      <div class="subtitle font-bold text-sm">Indexes:</div>
      <div class="subbody font-normal text-sm">
        {#await mypromise}
          <Skeltonloader eclass="mt-2" />
        {:then ok}
          {NoIndexes}
        {:catch}
          <Skeltonloader eclass="mt-2" />
        {/await}
      </div>
    </div>
  </div>
</div>

<style>
  .custom-card {
    border-radius: 7px;
  }
</style>
