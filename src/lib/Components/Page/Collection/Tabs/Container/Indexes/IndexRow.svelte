<script>
  export let name;
  export let key;
  export let indexesinfo;
  let { [name]: info } = indexesinfo;
  import IndexType from "./IndexType.svelte";
  import RightArrow from "$Components/Icons/RightArrow.svelte";
  import Exclamation from "$Components/Icons/Exclamation.svelte";
  import Bin from "$Components/Icons/Bin.svelte";
  import GetType from "./SetType.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = new createEventDispatcher();

  let row = {
    state: false,
    toggle: () => {
      row.state = !row.state;
    },
  };
  let hovering = {
    state: "",
    enter: () => {
      hovering.state = true;
    },
    leave: () => {
      hovering.state = false;
    },
  };

  let drop = {
    Signal: () => {
      dispatch("Dropindex", {
        indexname: name,
      });
    },
  };
</script>

<div
  on:mouseenter={hovering.enter}
  on:mouseleave={hovering.leave}
  class="flex gap-2 flex-row items-center border-b p-3 min-h-[58px] border-mongodark-200">
  <div class="flex-col flex-1 flex w-96 overflow-hidden">
    <div class="flex flex-row gap-2  text-ellipsis whitespace-nowrap">
      <button class:rotate-90={row.state} on:click|stopPropagation={row.toggle}>
        <RightArrow /></button>
      <span>{name}</span>
    </div>
    {#if row.state}
      {#each Object.entries(key) as [field, type], index (field)}
        <div class=" flex flex-row items-center pt-2  rounded px-2 ">
          <span
            class="bg-mongo-btn-dark-bg flex-0 py-1 text-xs font-bold flex justify-center items-center uppercase text-mongo-btn-dark-color  border border-solid px-2 rounded-full"
            ><span>{field}</span><span class="pl-2"><IndexType {type} /></span
            ></span>
        </div>
      {/each}
    {/if}
  </div>
  <div class="flex-1 flex">
    <div>
      <span
        class="bg-base-200 flex-0 py-1 text-xs font-bold gap-2 flex justify-center items-center uppercase text-mongo-btn-dark-color  border border-solid px-3 rounded-full">
        <span><GetType type={info[0][1]} /></span>
        <span><Exclamation /> </span>
      </span>
    </div>
  </div>
  <div class="flex-1 flex">
    <div>
      <span
        class="bg-base-200 flex-0 py-1 text-xs font-bold gap-2 flex justify-center items-center uppercase text-mongo-btn-dark-color  border border-solid px-3 rounded-full">
        <span>Property</span>
        <span><Exclamation /> </span>
      </span>
    </div>
  </div>
  <div class="flex-1 flex justify-center items-center">
    <span
      class="py-1 text-xs font-bold gap-2 flex justify-center items-center uppercase text-mongo-btn-dark-color  ">
      <span>
        {#if hovering.state && name !=="_id_"}
          <button
            on:click|stopPropagation={drop.Signal}
            class="w-6 h-6 transition-colors ease-in-out hover:bg-mongo-card-hoverbg  flex items-center justify-center border-none rounded-full   fill-mongo-icon">
            <Bin />
          </button>
        {/if}
      </span>
    </span>
  </div>
</div>
