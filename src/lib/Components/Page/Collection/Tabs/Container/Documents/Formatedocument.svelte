<script>
  export let doc;
  import Formateskeys from "./Formateskeys.svelte";
  import Bin from "$Components/Page/Database/Icons/Bin.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = new createEventDispatcher();
  $: isObject = typeof doc === "object" ? true : false;

  export let db;
  export let index;
  export let collection;

  $: _id = doc?._id ?? false;
  let is_delete = false;
  let hovering = {
    state: "",
    enter: () => {
      hovering.state = true;
      console.log(_id);
    },
    leave: () => {
      hovering.state = false;
    },
    removeDoc: () => {
      dispatch("removedoc", {
        index,
      });
    },
    delete: async () => {
      const data = {
        OP: "DELETE",
        _id,
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
      const response = await fetch("/api/DeleteDocument", options);
      const result = await response.json();
      if (result?.status ?? false) {
        is_delete = true;
        hovering.removeDoc();
      } else {

      }
    },
  };
</script>

{#if isObject}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="relative scrollbar bg-mongo-card-bg break-words break-all py-7 px-5 "
    on:mouseenter={hovering.enter}
    on:mouseleave={hovering.leave}
   >
    <div
      class="flex flex-col justify-start items-start text-xs font-mono overflow-hidden">
      {#each Object.entries(doc) as [key, value], index (key)}
        <div class="overflow-hidden">
          <Formateskeys {key} {value} />
        </div>
      {/each}
    </div>
    <span
      class:hidden={!hovering.state}
       on:click|stopPropagation={hovering.delete}
      class="btn  btn-sm rounded absolute top-2 right-2 fill-mongo-white"
      ><Bin /></span>
  </div>
{/if}
