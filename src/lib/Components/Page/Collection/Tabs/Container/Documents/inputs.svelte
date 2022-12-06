<script>
  export let name;
  export let value;
  export let placeholder;
  export let css = "";
  export let error = false;
  $: console.log("echo", error);
</script>

<div class="flex gap-2 {css}">
  <div
    class:bg-red-600={error}
    class:bg-mongo-tabs-filter-badge={!error}
    class="cbadge  py-1 px-2 text-mongo-white">
    {name}
  </div>
  <div class="w-full">
    <input
      on:keyup
      type="text"
      wrap="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      bind:value
      {placeholder}
      class="bg-transparent outline-none text-xs flex justify-center items-center tracking-wider text-mongo-white w-full h-5 border-none focus:border-none" />
  </div>
</div>

<style>
  .cbadge {
    white-space: nowrap;
    border-radius: 14px;
    margin-right: 5px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11px;
    flex-grow: 0;
    display: table;
  }
</style>
