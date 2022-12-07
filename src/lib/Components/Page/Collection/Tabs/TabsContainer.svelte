<script>
  import Documents from "./Container/Documents.svelte";
  import Aggregation from "./Container/Aggregation.svelte";
  export let CurrentTab;
</script>

<div class:hidden={CurrentTab !== "Documents"}>
  <Documents {...$$restProps} />
</div>
<div class:hidden={CurrentTab !== "Aggregation"}>
  <Aggregation  />
</div>

<!-- {#if CurrentTab === "Documents"}
  <Documents {...$$restProps}/>
{:else if CurrentTab === "Aggregation"}
  hello aggregartion >
{/if} -->
