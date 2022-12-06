<script>
  export let values = [];
  import Formateskeys from "./Formateskeys.svelte";
</script>

{#if values.length > 0}
  {#each values as value, index}
    <div class="overflow-hidden ml-5 flex flex-col">
      <Formateskeys key={index} {value} />
    </div>
  {/each}
{/if}
