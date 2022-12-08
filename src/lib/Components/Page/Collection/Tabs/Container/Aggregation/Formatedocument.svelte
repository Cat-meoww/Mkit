<script>
  export let doc;
  import Formateskeys from "$Components/Page/Collection/Tabs/Container/Documents/Formateskeys.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = new createEventDispatcher();
  $: isObject = typeof doc === "object" ? true : false;

  $: _id = doc?._id ?? false;
  let is_delete = false;
  
</script>

{#if isObject}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="relative scrollbar bg-mongo-card-bg break-words max-w-lg min-w-[32rem]  break-all py-7 px-5 "
    
   >
    <div
      class="flex flex-col justify-start items-start text-xs font-mono overflow-hidden">
      {#each Object.entries(doc) as [key, value], index (key)}
        <div class="overflow-hidden">
          <Formateskeys {key} {value} />
        </div>
      {/each}
    </div>
    
  </div>
{/if}
