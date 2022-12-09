<script>
  export let type;
</script>

{#if type ===1 || type ===-1 }
  Regular
{:else}
  {type}
{/if}
