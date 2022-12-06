<script>
  export let obj;
  import Formateskeys from "./Formateskeys.svelte";
</script>

{#each Object.entries(obj) as [key, value], index (key)}
  <div class="overflow-hidden ml-5 flex flex-col">
    <Formateskeys {key} {value} />
  </div>
{/each}
