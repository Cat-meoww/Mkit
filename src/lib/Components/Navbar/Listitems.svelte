<script>
  import { slide } from "svelte/transition";
  import { sidebar, NavCollReload,NewCollection,NewCollectionData,DropDb,DropDbData } from "$Components/stores.js";
  import CollectionGroup from "$Components/Navbar/CollectionGroup.svelte";
  import Skeltonloader from "$Components/Navbar/Skeltonloader.svelte";
  import HoverBtns from "$Components/Navbar/HoverDbBtn.svelte";
  import RightArrow from "$Components/Page/Database/Icons/RightArrow.svelte";

  export let dbname = "Default";

  let toggle = false;
  let dbcollections = [];
  let FirstLoad = true;
  let lazyloading = false;
  let getcollection = async (data) => {
    try {
      lazyloading = true;
      if (!FirstLoad) {
        return;
      }
      const options = {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("/api/getcollections", options);
      const collections = await response.json();
      console.table(collections);
      dbcollections = collections;
      FirstLoad = false;
    } catch (error) {
      console.error(error);
      dbcollections = [];
    } finally {
      lazyloading = false;
    }
  };

  function showDatabase(db) {
    toggle = !toggle;
    getcollection({ database: db });
    $sidebar.IsDb = true;
    $sidebar.Db = dbname;
  }
  function Toggle() {
    toggle = !toggle;
    console.log("tog", FirstLoad);
    if (FirstLoad) {
      getcollection({ database: dbname });
      $sidebar.IsDb = true;
      $sidebar.Db = dbname;
    }
  }
  function reloadcondition(reloaddata) {
    if (reloaddata.db === dbname) {
      FirstLoad = true;
      getcollection({ database: dbname });
    }
  }

  $: reloadColl = reloadcondition($NavCollReload);

  let hovering = {
    state: "",
    enter: () => {
      hovering.state = true;
    },
    leave: () => {
      hovering.state = false;
    },
    createCollection:(event)=>{
       $NewCollection = !$NewCollection
       $NewCollectionData={db:dbname}
    },
    dropDatabase:(event)=>{
       $DropDb=true
       $DropDbData={db:dbname}
       //console.log("jop");
    }
  };


</script>

<li>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={showDatabase(dbname)}
    on:mouseenter={hovering.enter}
    on:mouseleave={hovering.leave}
    class="flex gap-1 darkhover">
    <span
      on:click|stopPropagation={Toggle}
      class:rotate-90={toggle}
      class="h-5 w-5 flex justify-center items-center ease-in duration-200"
      ><RightArrow/></span>
    <span class="flex-1 capitalize">{dbname}</span>

    {#if hovering.state}
      <HoverBtns
        on:createCollection={hovering.createCollection}
        on:dropDatabase={hovering.dropDatabase} />
    {/if}
  </div>
</li>

{#if toggle}
  <div transition:slide={{ duration: 250 }}>
    {#if lazyloading}
      <Skeltonloader />
    {:else}
      <CollectionGroup db={dbname} collections={dbcollections} />
    {/if}
  </div>
{/if}

<style>
  .darkhover:hover {
    background-color: #273137;
  }
</style>
