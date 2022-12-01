<script>
  import { onMount } from "svelte";
  import Header from "./Database/header.svelte";
  import SkeltonHeader from "./Database/loadingheader.svelte";
  import CollectionsList from "./Database/Collections.svelte";
  import { DbPageReload } from "$Components/stores.js";
  export let db;

  let dbstatus = {};
  let collections;

  let Onload = async (data, reload) => {
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
      let response = await fetch("/api/databaseinfo", options);

      let result = await response.json();
      console.log("databaseinfo", result);

      return new Promise((resolve, reject) => {
        try {
          dbstatus = result?.status ?? {};
          collections = result?.collections?.firstBatch ?? [{}];
          resolve(true);
        } catch (e) {
          reject(e);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  $: Mypromise = Onload({ db }, $DbPageReload);
</script>

<div class="collection flex flex-col ">
  {#await Mypromise}
    <SkeltonHeader />
  {:then ok}
    <Header {db} status={dbstatus} />
    <CollectionsList {db} {collections} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
