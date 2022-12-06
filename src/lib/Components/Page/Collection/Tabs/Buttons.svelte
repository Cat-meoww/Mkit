<script>
  import { createEventDispatcher } from "svelte";
  export let BtnClass;
  export let BtnValue;
  const dispatch = createEventDispatcher();
  function CreateEvent() {
    dispatch("Selected", {
      tab: BtnValue,
    });
  }
  export let CurrentTab;
  $: css =
    CurrentTab === BtnValue
      ? "text-mongo-tabs-selected-text after:bg-mongo-tabs-selected-tile hover:text-mongo-tabs-selected-text hover:after:bg-mongo-tabs-selected-tile"
      : "";
</script>

<button class="{BtnClass} {css}" on:click|stopPropagation={CreateEvent}
  >{BtnValue}</button>
