<script>
  import { sidebar, IsGrid } from "../../stores.js";
  import Skeltonloader from "./skeltonloader.svelte";
  import { createEventDispatcher } from "svelte";
  import Bin from "./Icons/Bin.svelte";
  export let collection;
  const dispatch = createEventDispatcher();

  let db = $sidebar.Db;
  let collectionname = collection?.name;
  //  Reactive css for list and grid
  $: css = $IsGrid ? "flex-col" : "flex-row";
  $: bodycss = $IsGrid ? "flex-row gap-2" : "flex-col gap-0";
  $: cardcss = $IsGrid ? "min-w-[30%] " : "";

  let Storagesize,
    Indexes,
    TotalIndexsize,
    avgdoc,
    totaldocs = 0;
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
      let response = await fetch("/api/collectioninfo", options);

      let result = await response.json();

      //await new Promise((resolve) => setTimeout(resolve, 1000));

      return new Promise((resolve, reject) => {
        try {
          if (result?.ok ?? false) {
            Storagesize = readableBytes(result.response?.size ?? 0);
            Indexes = result.response?.nindexes ?? 0;
            TotalIndexsize = readableBytes(
              result.response?.totalIndexSize ?? 0
            );

            avgdoc = readableBytes(result.response?.avgObjSize ?? 0);
            totaldocs = intToString(result.response?.count ?? 0);
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

  $: mypromise = Onload({ db, collection: collectionname });

  function readableBytes(bytes) {
    if (bytes == 0) {
      return "0 B";
    }

    var i = Math.floor(Math.log(bytes) / Math.log(1000)),
      sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    return (bytes / Math.pow(1000, i)).toFixed(2) * 1 + " " + sizes[i];
  }
  function intToString(num) {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v).toFixed(0).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      si[index].s
    );
  }

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
    database: db,
    collection: collectionname,
    dataset: "",
    onload: () => {
      return Promise.resolve(
        (card.dataset = card.database + "." + card.collection)
      );
    },
    dblclick: async (event) => {
      await card.onload();
      console.log("collectionname", card);
      await new Promise((resolve) => {
        $sidebar.IsDb = false;
        $sidebar.CurrentDataSet = card.dataset;
        $sidebar.Db = card.database;
        $sidebar.Collection = card.collection;
        return resolve();
      });
    },
    dropCollection: () => {
      
      dispatch("dropCollection", { db, collection: collectionname });
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
    <span class="h-7 ">{collection?.name ?? "NA"} </span>

    {#if hovering.state}
      <div
        on:click|stopPropagation={card.dropCollection}
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
        {/await}
      </div>
    </div>
    <div
      class="flex  flex-1   overflow-hidden whitespace-normal text-ellipsis  {bodycss}">
      <div class="subtitle font-bold text-sm">Documents:</div>
      <div class="subbody  font-normal text-sm">
        {#await mypromise}
          <Skeltonloader eclass="mt-2" />
        {:then ok}
          {totaldocs}
        {/await}
      </div>
    </div>
    <div
      class="flex  flex-1   overflow-hidden whitespace-normal text-ellipsis  {bodycss}">
      <div class="subtitle font-bold text-sm">Avg. document size:</div>
      <div class="subbody  font-normal text-sm">
        {#await mypromise}
          <Skeltonloader eclass="mt-2" />
        {:then ok}
          {avgdoc}
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
          {Indexes}
        {/await}
      </div>
    </div>
    <div
      class="flex  flex-1   overflow-hidden whitespace-normal text-ellipsis  {bodycss}">
      <div class="subtitle font-bold text-sm">Total Index size:</div>
      <div class="subbody  font-normal text-sm">
        {#await mypromise}
          <Skeltonloader eclass="mt-2" />
        {:then ok}
          {TotalIndexsize}
        {:catch error}
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
