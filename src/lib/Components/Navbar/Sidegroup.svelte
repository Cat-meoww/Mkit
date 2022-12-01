<script>
  export let GroupName = "Groupname";
  import DatabaseIcon from "$Components/Page/Database/Icons/DatabaseIcon.svelte";
  import { sidebar } from "$Components/stores.js";
  let Databasebtn = {
    click: () => {
      $sidebar = {
        Db: "",
        Collection: "",
        CurrentDataSet: "",
        IsDb: false,
      };
    },
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
      <span class="text-mongo-white">{GroupName}</span>
    </button>
  </li>
  <slot>Loading ...</slot>
</ul>
