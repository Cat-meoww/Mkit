<script>
  export let doc;
  import Formateskeys from "./Formateskeys.svelte"
  $: isObject = typeof doc === "object" ? true : false;
</script>

{#if isObject}
<div class="flex flex-col justify-start items-start text-xs font-mono overflow-hidden">
  {#each Object.entries(doc) as [key, value], index (key)}
   <div class="overflow-hidden"><Formateskeys {key}{value}/></div> 
  {/each}
</div>

{/if}
