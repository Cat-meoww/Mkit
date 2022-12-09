<script>
  import RefreshIcon from "$Components/Icons/Refresh.svelte";
  import Indextable from "./Indexes/Indextable.svelte";
  import { onMount } from "svelte";
  let IndexesPromise = Promise.resolve(true);
  export let db;
  export let collection;
  let Tab = {
    Refresh: () => {
      console.log("refresh");
      IndexesPromise = Tab.getdata();
    },
    PageTable: () => {},
    getdata: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          let data = {
            db,
            collection,
          };
          const options = {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
          const response = await fetch("/api/getIndex", options);
          const result = await response.json();
          return resolve(result);
        } catch (error) {
          return reject(result);
        }
      });
    },
  };
  onMount(()=>{
    Tab.Refresh();
  })
</script>

<div
  class="flex flex-col overflow-x-hidden gap-3 py-4 overflow-y-scroll px-4 h-[74vh] scrollbar break-words ">
  <div
    class="bg-mongodark-100 p-5 rounded-lg border border-solid border-mongo-tabs-border flex flex-col">
    <div class="flex flex-row justify-end items-center gap-4">
      <button
        on:click|stopPropagation={Tab.Refresh}
        class="flex flex-row justify-center items-center gap-1.5  bg-mongo-btn-dark-bg text-mongo-btn-dark-color hover:bg-mongo-btn-dark-hover-bg border-mongo-btn-dark-border border border-solid hover:border-mongo-btn-dark-hover-border hover:shadow-mongo-btn-dark-hover-box-c px-2 rounded py-1">
        <span class="w-4 fill-mongo-btn-dark-color"> <RefreshIcon /></span>
        <span>Refresh</span>
      </button>
      <button
        class="flex flex-row justify-center items-center  bg-mongo-green-btn hover:bg-mongo-green-hover px-2 rounded py-1">
        <span>Create Index </span></button>
    </div>
    <div class="pt-4">
      {#await IndexesPromise}
        Loading..
      {:then result}
        {#if result?.ok ?? false === 1}
          <Indextable
            indexes={result.data?.indexes ?? []}
            indexesinfo={result.data?.indexesinfo ?? []} />
          
        {/if}
      {/await}
    </div>
  </div>
</div>
<style>
  .scrollbar::-webkit-scrollbar {
    width: 0px;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    border: 0px;
  }
</style>
