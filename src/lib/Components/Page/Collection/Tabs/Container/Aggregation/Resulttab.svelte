<script>
  export let total;
  import RightArrow from "$Components/Page/Database/Icons/RightArrow.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = new createEventDispatcher();
  export let from;
  export let to;


  function backward() {
    dispatch("backward", {
      status: true,
    });
  }
  function forward() {
    dispatch("forward", {
      status: true,
    });
  }
  
</script>

<div
  class="result-bar flex-1 px-2.5 py-1 border-b border-solid border-mongo-tabs-border">
  <div class="flex justify-between">
    <div>
      <div class="px-2" />
    </div>
    <div class="flex gap-2 justify-center items-center ">
      <span
        >Displaying documents <span>{from}</span> - <span>{to}</span> of
        <span>{total}</span></span>
      <button
        on:click={backward}
        class="w-6 h-5 bg-mongodark-100 rotate-180 flex justify-center items-center border border-solid border-mongo-tabs-border"
        ><RightArrow /></button>
      <button
        on:click={forward}
        class="w-6 h-5 bg-mongodark-100 flex justify-center items-center border border-solid border-mongo-tabs-border"
        ><RightArrow /></button>
    </div>
  </div>
</div>
