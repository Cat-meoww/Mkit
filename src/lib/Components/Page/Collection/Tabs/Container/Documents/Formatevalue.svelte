<script>
  export let value;
  let VType = typeof value;
  import Isobject from "./Isobject.svelte";
  import Isarray from "./Isarray.svelte";
  let notdisplay = true;
</script>

{#if VType === "string"}
  <div
    class="flex flex-row  text-mongo-bluetext w-full text-ellipsis whitespace-nowrap overflow-hidden">
    <span class="flex-0">"</span>
    <span
      class="flex-initial max-w-[500px] text-ellipsis whitespace-nowrap overflow-hidden"
      >{value}</span>
    <span class="flex-0">"</span>
  </div>
{:else if VType === "number"}
  <span class="text-mongo-greentext">{value}</span>
{:else if Array.isArray(value)}
  <button
    class="cursor-pointer"
    on:click={() => {
      notdisplay = !notdisplay;
    }}>{"Array"}</button>
  {#if !notdisplay}
    <div class:hidden={notdisplay} class="flex-col flex">
      <Isarray values={value} />
    </div>
  {/if}
{:else if VType === "object"}
  <button
    class="cursor-pointer"
    on:click={() => {
      notdisplay = !notdisplay;
    }}>{"Object"}</button>
  {#if !notdisplay}
    <div class:hidden={notdisplay} class="flex-col flex">
      <Isobject obj={value} />
    </div>
  {/if}
{/if}
