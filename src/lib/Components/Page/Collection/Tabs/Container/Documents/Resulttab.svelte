<script>
  export let total;
  import RightArrow from "$Components/Page/Database/Icons/RightArrow.svelte";
  import CreateDocument from "$Components/GlobalModals/CreateDocument.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = new createEventDispatcher();
  export let from;
  export let to;
  export let db;
  export let collection;

  let createdocument = false;

  function backward() {
    dispatch("backward", {
      status: true,
    });
  }
  function forward() {
    dispatch("forward", {
      status: true,
    });
  }
  function reloadTable() {
    dispatch("reload", {
      status: true,
    });
  }
  function openmodal() {
    createdocument = true;
  }

  let modal = {
    error: false,
    errmsg: "",
    NewDoc: "",
    cancel: (event) => {
      createdocument = false;
      modal.error = false;
      modal.errmsg = "";
      modal.NewDoc = "";
    },
    change: (event) => {
      try {
        let NewDoc = event.detail?.NewDoc;
        let dummy = JSON.parse(NewDoc);
        modal.NewDoc = JSON.stringify(dummy, null, 2);
        modal.error = false;
      } catch (error) {
        modal.error = true;
      }
    },
    submit: async (event) => {
      try {
        let NewDoc = event.detail?.NewDoc;
        let data = {
          doc: JSON.parse(NewDoc),
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
        const response = await fetch("/api/InsertNew", options);
        const result = await response.json();
        if (result?.status ?? false) {
          modal.cancel();
          modal.errmsg = "";
          reloadTable();
        } else {
          if (result?.error ?? false) {
            modal.errmsg = result?.msg ?? "Invalid data";
          }
        }
        
      } catch (error) {}
    },
  };
</script>

<div
  class="result-bar px-2.5 py-1 border-b border-solid border-mongo-tabs-border">
  <div class="flex justify-between">
    <div>
      <div class="px-2">
        <button
          on:click|stopPropagation={openmodal}
          class="h-5 px-4 py-3 bg-mongo-green-btn rounded flex justify-center items-center border border-solid bold border-mongo-tabs-border"
          >Add Data</button>
      </div>
    </div>
    <div class="flex gap-2 justify-center items-center ">
      <span
        >Displaying documents <span>{from}</span> - <span>{to}</span> of
        <span>{total}</span></span>
      <button
        on:click={backward}
        class="w-6 h-5 bg-mongodark-100 rotate-180 flex justify-center items-center border border-solid border-mongo-tabs-border"
        ><RightArrow /></button>
      <button
        on:click={forward}
        class="w-6 h-5 bg-mongodark-100 flex justify-center items-center border border-solid border-mongo-tabs-border"
        ><RightArrow /></button>
    </div>
  </div>
</div>

{#if createdocument}
  <CreateDocument
    bind:NewDoc={modal.NewDoc}
    bind:err={modal.error}
    bind:msg={modal.errmsg}
    on:cancel={modal.cancel}
    on:submit={modal.submit}
    on:change={modal.change} />
{/if}
