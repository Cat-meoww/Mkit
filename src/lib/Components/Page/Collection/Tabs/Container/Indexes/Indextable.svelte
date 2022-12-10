<script>
  export let indexes;
  export let db;
  export let collection;
  import Row from "./IndexRow.svelte";
  import DropIndex from "$Components/GlobalModals/DropIndex.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = new createEventDispatcher();
  export let indexesinfo;
  let row = {
    state: false,
    toggle: () => {
      row.state = !row.state;
    },
  };
  let Dropmodal = {
    error: false,
    msg: false,
    state: false,
    input: "",
    indexname: "",
    reloadtab: () => {
      dispatch("Refresh", true);
    },
    seterror: (msg) => {
      Dropmodal.msg = msg;
      Dropmodal.error = true;
    },
    unseterror: () => {
      Dropmodal.msg = "";
      Dropmodal.error = false;
    },
    open: (event) => {
      Dropmodal.indexname = event.detail?.indexname ?? false;
      Dropmodal.state = true;
      console.log("iop", Dropmodal);
    },
    change: async (event) => {
      try {
        let input = event.detail?.indexname ?? false;
        await Dropmodal.validate(input);
        Dropmodal.unseterror();
      } catch (error) {
        Dropmodal.seterror(error);
      }
    },
    validate: (input) => {
      return new Promise((resolve, reject) => {
        if (input) {
          if (Dropmodal.indexname !== input) {
            return reject("Invalid Index Name");
          }
          return resolve(true);
        }
      });
    },
    submit: async (event) => {
      try {
        let input = event.detail?.indexname ?? false;
        await Dropmodal.validate(input);
        let data = {
          db,
          collection,
          indexname: input,
        };
        await Dropmodal.serve(data);

        Dropmodal.unseterror();
        Dropmodal.reloadtab();
        Dropmodal.close();
      } catch (error) {
        Dropmodal.seterror(error);
      }
    },
    serve: (data) => {
      return new Promise(async (resolve, reject) => {
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
          const response = await fetch("/api/DropIndex", options);
          const result = await response.json();
          if (result?.ok ?? false === 1) {
            resolve(true);
          } else {
            reject(result?.msg ?? result);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    reset: () => {
      Dropmodal.indexname = "";
      Dropmodal.input = "";
    },
    close: () => {
      Dropmodal.state = false;
      Dropmodal.reset();
    },
  };
</script>

<div class="flex gap-2 flex-row border-b p-3  border-mongodark-200">
  <div class="flex-col flex-1 flex w-96 overflow-hidden">
    <div class="flex flex-row gap-2  text-ellipsis whitespace-nowrap">
      <span>Name and Definition</span>
    </div>
  </div>
  <div class="flex-col flex-1 ">
    <div class="flex flex-row gap-2  text-ellipsis whitespace-nowrap">
      <span>Type</span>
    </div>
  </div>
  <div class="flex-col flex-1 ">
    <div class="flex flex-row gap-2  text-ellipsis whitespace-nowrap">
      <span>Property</span>
    </div>
  </div>
  <div class="flex-col flex-1 ">
    <div class="flex flex-row gap-2  text-ellipsis whitespace-nowrap">
      <span />
    </div>
  </div>
</div>
<div class="flex flex-col">
  {#each indexes as { key, name }}
    <Row {name} {key} {indexesinfo} on:Dropindex={Dropmodal.open} />
  {/each}
</div>

{#if Dropmodal.state}
  <DropIndex
    bind:indexname={Dropmodal.input}
    bind:Index={Dropmodal.indexname}
    on:validate={Dropmodal.change}
    on:submit={Dropmodal.submit}
    on:cancel={Dropmodal.close}>
    {#if Dropmodal.error}
      <div
        class="p-3 mt-3 text-red-500 transition-all delay-150 rounded-md border border-red-500">
        {Dropmodal.msg}
      </div>
    {/if}</DropIndex>
{/if}
