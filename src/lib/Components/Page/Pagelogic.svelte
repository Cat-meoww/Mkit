<script>
  import {
    sidebar
  } from "$Components/stores.js";
  import DatabasePage from "$Components/Page/DatabasePage.svelte";
  import CollectionPage from "$Components/Page/CollectionPage.svelte";
  import IndexPage from "$Components/Page/Index.svelte";
  
</script>

{#if $sidebar.IsDb}
  <DatabasePage db={$sidebar.Db} />
{:else if $sidebar.CurrentDataSet}
  {#key $sidebar.CurrentDataSet}
    <CollectionPage db={$sidebar.Db} collection={$sidebar.Collection} dataset={$sidebar.CurrentDataSet} />
  {/key}
{:else}
 <IndexPage />
{/if}