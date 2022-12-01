<script>
  import Sidebar from "$Components/Navbar/Sidebar.svelte";
  import Topnav from "$Components/Navbar/Topnav.svelte";
  import Sidegroup from "$Components/Navbar/Sidegroup.svelte";
  import Hostinfo from "$Components/Navbar/Hostinfo.svelte";
  import Listitems from "$Components/Navbar/Listitems.svelte";
  import MainDrawer from "$Components/Drawer/MainDrawer.svelte";
  import Pagelogic from "$Components/Page/Pagelogic.svelte";
  import { onMount } from "svelte";
  import NewCollection from "$Components/MyModals/NewCollection.svelte";
  import Dropcollection from "$Components/MyModals/Dropcollection.svelte";
  import DropDatabase from "$Components/MyModals/DropDatabase.svelte";
  import CreateDatabase from "$Components/MyModals/CreateDatabase.svelte";
  import { Sortbyname } from "$Components/helper.js";
  import { Reloadsidebar } from "$Components/stores.js";
  import { browser, dev, } from '$app/environment';
  console.log({browser, dev });
  // export let data;
  // const { datalist } = data;
  let databases = [];
  // let onload = async () => {
  //   let temp = await JSON.parse(datalist);
  //   // databases = temp.databases;
  //   // databases.sort(Sortbyname);
  // };
  // onMount(() => {
  //   onload();
  // });

  

 

  let app = {
    Pingserver: async (data, status) => {
      try {
        const options = {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body:  JSON.stringify(data),
        };
        const response = await fetch("/api/alldatabasesinfo", options);
        if (response.status === 200) {
          let result = await response.json();
          if (result?.ok ?? false) {
            databases = result.databases;
            databases.sort(Sortbyname);
          }
        } else {
          console.log(await response.json());
        }
      } catch (e) {
        console.error("Ping server --- > ", {data,e});
      }
    },
  };
  let status = {
    status: true,
  };
  $: mypromise = app.Pingserver(status, $Reloadsidebar);
</script>

<MainDrawer>
  <!-- Main Content -->
  <span slot="Maincontent">
    <Topnav />
    <Pagelogic />
  </span>
  <!-- Top left sidebar -->
  <!-- badge={formatBytes(database.sizeOnDisk)} -->
  <Sidebar>
    <Hostinfo />
    <Sidegroup GroupName="Database">
      {#each databases as database}
        {#if !database.empty}
          <Listitems dbname={database.name} />
        {/if}
      {/each}
    </Sidegroup>
  </Sidebar>
</MainDrawer>
<NewCollection />
<Dropcollection />
<DropDatabase />
<CreateDatabase />
