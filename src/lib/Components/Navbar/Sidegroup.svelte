<script>
  export let GroupName = "Groupname";
  import DatabaseIcon from "$Components/Page/Database/Icons/DatabaseIcon.svelte";
  import RefreshIcon from "$Components/Page/Database/Icons/RefreshIcon.svelte";
  import { sidebar,Reloadsidebar } from "$Components/stores.js";
  let Databasebtn = {
    click: () => {
      $sidebar = {
        Db: "",
        Collection: "",
        CurrentDataSet: "",
        IsDb: false,
      };
    },
    Reload:()=>{
      $Reloadsidebar=!$Reloadsidebar
    }
  };
</script>

<ul class="menu menu-compact flex flex-col p-0">
  <li />
  <li class="menu-title hover:bg-base-300 py-1.5">
    <button
      type="button"
      on:click={Databasebtn.click}
      title="Databases"
      class="flex  items-center">
      <DatabaseIcon />
      <span class="text-mongo-white flex-1 flex justify-start gap-2"
        ><span>{GroupName}</span></span>
      <button title="Reload" on:click={Databasebtn.Reload} class="text-mongo-white hover:fill-white fill-mongo-white">
        <span><RefreshIcon /></span>
      </button>
    </button>
  </li>
  <slot>Loading ...</slot>
</ul>
