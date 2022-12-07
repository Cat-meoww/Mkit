<script>
  import Formatedocument from "./Formatedocument.svelte";
  export let docs;
  export let db;
  export let collection;
  function removedoc(event) {
    let index = event.detail?.index ?? false;
    //console.log("delete",index)
    if (index !== false) {
      console.log("op")
      docs.splice(index, 1);
      docs = docs;
    }
  }
</script>

<div
  class="flex flex-col overflow-x-hidden gap-3 py-4 overflow-y-scroll px-4 h-[74vh] scrollbar  break-words ">
  {#each docs as doc, index (doc._id)}
    <Formatedocument {doc} {db} {index} {collection} on:removedoc={removedoc} />
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
