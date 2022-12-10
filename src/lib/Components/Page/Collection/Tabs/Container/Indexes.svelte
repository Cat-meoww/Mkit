<script>
  import RefreshIcon from "$Components/Icons/Refresh.svelte";
  import Indextable from "./Indexes/Indextable.svelte";
  import CreateIndex from "$Components/GlobalModals/CreateIndex.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = new createEventDispatcher();
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
  let modal = {
    state: false,
    error: false,
    errmsg: false,

    indexFields: 1,
    reload: () => {
      Tab.Refresh();
    },
    open: () => {
      modal.state = true;
    },
    reset: () => {
      modal.unseterror();
    },
    seterror: (msg) => {
      modal.error = true;
      modal.errmsg = msg;
    },
    unseterror: () => {
      modal.error = false;
      modal.errmsg = false;
    },
    change: () => {},
    submit: async (event) => {
      let formdata = event.detail?.coin ?? [];
      console.log(formdata);
      await modal.createIndex(formdata);
    },
    createIndex: async (payload) => {
      try {
        let data = {
          payload,
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
        const response = await fetch("/api/CreateIndex", options);
        const result = await response.json();
        if (result?.ok ?? false) {
          modal.unseterror();
          modal.close();
          modal.reload();
        } else {
          modal.seterror(result?.msg??result);
        }
      } catch (error) {
        throw error;
        modal.seterror(error);
      }
    },
    close: () => {
      modal.state = false;
      modal.reset();
    },
  };
  onMount(() => {
    Tab.Refresh();
  });

  
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
        on:click|stopPropagation={modal.open}
        class="flex flex-row justify-center items-center  bg-mongo-green-btn hover:bg-mongo-green-hover px-2 rounded py-1">
        <span>Create Index </span></button>
    </div>
    <div class="pt-4">
      {#await IndexesPromise}
        Loading..
      {:then result}
        {#if result?.ok ?? false === 1}
          <Indextable on:Refresh={Tab.Refresh}
          {db} {collection}
            indexes={result.data?.indexes ?? []}
            indexesinfo={result.data?.indexesinfo ?? []} />
        {/if}
      {/await}
    </div>
  </div>
</div>

{#if modal.state}
  <CreateIndex
    bind:err={modal.error}
    bind:msg={modal.errmsg}
    on:cancel={modal.close}
    on:submit={modal.submit}
    on:change={modal.change} />
{/if}

<style>
  .scrollbar::-webkit-scrollbar {
    width: 0px;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    border: 0px;
  }
</style>
