<script>
  import Header from "./Index/header.svelte";
  import SkeltonHeader from "./Index/loadingheader.svelte";
  import DatabasesList from "./Index/Databases.svelte";
  import { Reloadsidebar, Maindata ,completedReload} from "$Components/stores.js";

  let db = {
    total: 0,
    size: 0,
  };
  function readableBytes(bytes) {
    if (bytes == 0) {
      return "0 B";
    }

    var i = Math.floor(Math.log(bytes) / Math.log(1000)),
      sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + " " + sizes[i];
  }

  let firstload = async (data, reload) => {
    try {
      const options = {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      let response = await fetch("/api/alldatabasesinfo", options);

      let result = await response.json();

      return new Promise((resolve, reject) => {
        try {
          if (result?.ok ?? false) {
            db.total = result.databases.length;
            db.size = readableBytes(result.totalSize);
            db.databases = result.databases;
            resolve(true);
            return;
          }
          reject("failed to fetch");
          return;
        } catch (e) {
          console.error("op Index  -----> ", e);
          reject(e);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  let Custom_Load = async (reload) => {
    console.log("completedReload",reload);
    return new Promise((resolve, reject) => {
      try {
        
        db.total = $Maindata?.databases.length??0;
        db.size = readableBytes($Maindata?.totalSize??0);
        db.databases = $Maindata?.databases??[{}];
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
  // $: Mypromise = firstload({ status: true }, $Reloadsidebar);
  $: Mypromise = Custom_Load($completedReload);
</script>

<div class="collection flex flex-col ">
  {#await Mypromise}
    <SkeltonHeader />
  {:then ok}
    <Header {db} />
    <DatabasesList bind:dbs={db.databases} />
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
</div>
