<script>
  export let type;
  let typeT = typeof type;
  import UpArrow from "$Components/Icons/UpArrow.svelte";
</script>

{#if type === 1}
  <span><UpArrow /></span>
{:else if type === -1}
  <span ><UpArrow css="rotate-180" /></span>
{:else}
  ({type})
{/if}
