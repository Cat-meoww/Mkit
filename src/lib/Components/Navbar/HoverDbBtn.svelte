<script>
    import { createEventDispatcher } from "svelte";
    const dispatch=new createEventDispatcher();
    function createCollection() {
        dispatch("createCollection",{status:true})
    }
    function dropDatabase() {
        dispatch("dropDatabase",{status:true})
    }
</script>

<div class="flex justify-center items-center gap-1">
  <button type="New " title="Create Collection" on:click|stopPropagation={createCollection} class="hover:bg-mongo-card-btnborder rounded-full transition-colors duration-100 hover:fill-mongo-white fill-white"
    ><div class="flex justify-center items-center ">
      <span role="presentation" class="h-5 w-5 flex justify-center items-center ease-in duration-200"
        ><svg
          width="14"
          height="14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class=""
          role="img"
          aria-label="Plus Icon"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 2a1 1 0 00-1 1v3.5H3a1 1 0 00-1 1v1a1 1 0 001 1h3.5V13a1 1 0 001 1h1a1 1 0 001-1V9.5H13a1 1 0 001-1v-1a1 1 0 00-1-1H9.5V3a1 1 0 00-1-1h-1z"
            fill="currentColor"
            data-darkreader-inline-fill=""
            style="--darkreader-inline-fill:currentColor;" /></svg
        ></span>
    </div></button>
  <button type="Drop" title="Drop Database"  on:click|stopPropagation={dropDatabase} class="hover:bg-mongo-card-btnborder rounded-full transition-colors duration-100 hover:fill-mongo-white fill-white"
    ><div class="flex justify-center items-center ">
      <span role="presentation" class="h-5 w-5 flex justify-center items-center ease-in duration-200"
        ><svg
          width="14"
          height="14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class=""
          role="img"
          aria-label="Trash Icon"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 2a1 1 0 011-1h4a1 1 0 011 1h2a1 1 0 011 1v1H2V3a1 1 0 011-1h2zm9 3H2l1.678 8.392A2 2 0 005.64 15h4.72a2 2 0 001.962-1.608L14 5z"
            fill="currentColor"
            data-darkreader-inline-fill=""
            style="--darkreader-inline-fill:currentColor;" /></svg
        ></span>
    </div></button>
</div>
