<script>
  export let indexes;
  import Row from "./IndexRow.svelte";
  export let indexesinfo;
  let row = {
    state: false,
    toggle: () => {
      row.state = !row.state;
    },
  };
</script>
<div class="flex gap-2 flex-row border-b p-3  border-mongodark-200">
  <div class="flex-col flex-1 flex w-96 overflow-hidden">
    <div class="flex flex-row gap-2  text-ellipsis whitespace-nowrap">
      
      <span>Name and Definition</span>
    </div>
    
  </div>
  <div class="flex-col flex-1 ">
    <div class="flex flex-row gap-2  text-ellipsis whitespace-nowrap">
      
      <span>Type</span>
    </div>
    
  </div>
  <div class="flex-col flex-1 ">
    <div class="flex flex-row gap-2  text-ellipsis whitespace-nowrap">
      
      <span>Property</span>
    </div>
    
  </div>
</div>
<div class="flex flex-col">
  {#each indexes as { key, name }}
  
    <Row {name} {key} {indexesinfo}/>
  {/each}
</div>
