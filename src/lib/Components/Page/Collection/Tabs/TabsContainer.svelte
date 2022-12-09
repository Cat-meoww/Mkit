<script>
  import Documents from "./Container/Documents.svelte";
  import Aggregation from "./Container/Aggregation.svelte";
  import Indexes from "./Container/Indexes.svelte";
  export let CurrentTab;
</script>

<div class:hidden={CurrentTab !== "Documents"}>
  <Documents {...$$restProps} />
</div>
<div class:hidden={CurrentTab !== "Aggregation"}>
  <Aggregation {...$$restProps}  />
</div>
<div class:hidden={CurrentTab !== "Indexes"}>
  <Indexes {...$$restProps}  />
</div>

<!-- {#if CurrentTab === "Documents"}
  <Documents {...$$restProps}/>
{:else if CurrentTab === "Aggregation"}
  hello aggregartion >
{/if} -->
