<script>
  import Buttons from "./Tabs/Buttons.svelte";
  let BtnClass =
    "px-4 py-3  text-base border-none max-w-xs  whitespace-nowrap transition-colors ease-in-out font-semibold text-mongo-card-textcolor capitalize hover:text-mongo-tabs-texthover hover:after:scale-x-95 after:scale-x-95 relative after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:content-[''] after:rounded-t  hover:after:bg-mongo-card-hoverbg";
  export let CurrentTab;
  let Controller = {
    Selected: (e) => {
      CurrentTab = e.detail.tab;
      //console.log(CurrentTab);
    },
  };
  let Tabs = ["Documents", "Aggregation", "Indexes"];
</script>

<div
  class="bg-mongodark-100 px-4 border-b border-solid border-mongo-tabs-border">
  <div class="flex flex-row overflow-x-auto">
    {#each Tabs as tab, index}
      <Buttons
        {BtnClass}
        BtnValue={tab}
        {CurrentTab}
        on:Selected={Controller.Selected} />
    {/each}
  </div>
</div>
