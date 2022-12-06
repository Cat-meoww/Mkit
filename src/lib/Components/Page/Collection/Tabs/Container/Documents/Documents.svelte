<script>
    import Formatedocument from "./Formatedocument.svelte"
  export let docs;
  
</script>

<div
  class="flex flex-col overflow-x-hidden gap-3 py-4 overflow-y-scroll px-4 h-[74vh] scrollbar  break-words ">
  {#each docs as doc}
    <div class=" scrollbar bg-mongo-card-bg break-words break-all py-7 px-5">
      <Formatedocument doc={doc}/>
    </div>
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
