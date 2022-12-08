<script>
  import Formatedocument from "./Formatedocument.svelte";
  export let docs;
  
</script>

<div
  class="flex flex-col overflow-x-hidden gap-3 py-4 overflow-y-scroll px-4 h-[74vh]  items-center  scrollbar  break-words ">
  {#each docs as doc, index}
    <Formatedocument {doc}  />
  {/each}
</div>

<style>
  .scrollbar::-webkit-scrollbar {
    width: 0px;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    border: 0px;
  }
</style>
