<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let indexFields;
  export let index;
  export let value = { indexfield: "", type: true };
  export let error;
  let indextype = {
    ASC: "1 (ASC)",
    DESC: "-1 (DESC)",
    TEXT: "TEXT",
    GEOSPATIAL: "GEOSPATIAL (2d Sphere)",
  };

  function Addfields() {
    dispatch("Addfield", {
      status: 1,
    });
  }
  function Removefields() {
    dispatch("Removefield", {
      status: 1,
      index,
    });
  }
  let fielderror;
  let typeerror;

  function errorCheck(error) {
    if (value.indexfield) {
      value.error = false;
      fielderror = false;
    } else {
      value.error = true;
      fielderror = true;
    }
    if (value.type) {
      value.error = false;
      typeerror = false;
    } else {
      value.error = true;
      typeerror = true;
    }
    if (value.indexfield && value.type) {
      value.error = false;
    } else {
      value.error = true;
    }
  }
  $: errorCheck(error);
</script>

<div class="form-control flex-1 w-full">
  <div class="input-group   w-full flex-1">
    <input
      class:border-red-500={fielderror}
      bind:value={value.indexfield}
      type="text"
      placeholder="Index Field"
      class="input input-bordered  flex-1" />
    <select
      bind:value={value.type}
      class:border-red-500={typeerror}
      class="select select-bordered flex-1">
      {#each Object.entries(indextype) as [key, value], index (key)}
        <option value={key}>{value}</option>
      {/each}
    </select>
    <div class="flex flex-row mx-4 gap-2">
      <button
        on:click|stopPropagation={Addfields}
        class="flex flex-col items-center justify-center content-center btn bg-mongodark-200 ">
        +
      </button>
      {#if indexFields > 1}
        <button
          on:click|stopPropagation={Removefields}
          class="flex flex-col items-center justify-center content-center btn bg-mongodark-200 ">
          -
        </button>
      {/if}
    </div>
  </div>
</div>
