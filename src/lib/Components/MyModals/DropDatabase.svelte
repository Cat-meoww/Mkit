<script>
  import {
    DbPageReload,
    NavCollReload,
    DropDbData,
    DropDb,
    Reloadsidebar,
    sidebar,
  } from "$Components/stores.js";

  import { beforeUpdate, afterUpdate } from "svelte";
  import { Blacklist } from "$Components/helper.js";

  import DropDatabase from "$Components/GlobalModals/DropDatabase.svelte";

  $: OrginDb = $DropDbData?.db ?? "";

  //console.log({ OrginDb });
  let DropModal = {
    error: false,
    msg: false,
    db: "",
    cancel: () => {
      $DropDb = false;
      DropModal.error = false;
      DropModal.msg = false;
      DropModal.db = "";
    },
    submit: async (event) => {
      try {
        let db = event.detail.dbname;
        console.log(event.detail);
        await DropModal.validate(db);
        let data = $DropDbData;
        console.log("valid", data);
        await DropModal.pingnewcollection(data);
        DropModal.sidebar(data);
        DropModal.cancel();
      } catch (error) {
        console.log("invalid");
        DropModal.error = true;
        DropModal.msg = error;
      }
    },
    noerror: () => {
      DropModal.error = false;
      DropModal.msg = "";
    },
    sidebar: (data) => {
      if ($sidebar.Db == data?.db ?? "") {
        $sidebar.IsDb = false;
        $sidebar.Db = "";
        $sidebar.Collection = "";
        $sidebar.CurrentDataSet = "";
      }
    },

    validate: (dbname) => {
      return new Promise((resolve, reject) => {
        //console.log(dbname+""+OrginDb)
        if (dbname !== OrginDb) {
          return reject("Database name not matched");
        }
        resolve(true);
      });
    },
    change: async (event) => {
      try {
        let ok = await DropModal.validate(event.detail.dbname);
        DropModal.noerror();
      } catch (error) {
        DropModal.error = true;
        DropModal.msg = error;
      }
    },

    pingnewcollection: async (data) => {
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
        const response = await fetch("/api/dropdatabase", options);
        if (response.status === 200) {
          let result = await response.json();

          if (result.status) {
            console.log(result);
            $DbPageReload = !$DbPageReload;
            $NavCollReload.state = !$NavCollReload.state;
            $NavCollReload.db = data.db;
            $Reloadsidebar = !$Reloadsidebar;
          }
        } else {
          return Promise.reject(await response.json());
        }
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }
    },
  };

  afterUpdate(() => {
    if (Blacklist(OrginDb)) {
      DropModal.cancel();
    }
  });
</script>

{#if $DropDb}
  <DropDatabase
    bind:OrginDb
    bind:dbname={DropModal.db}
    on:cancel={DropModal.cancel}
    on:submit={DropModal.submit}
    on:validate={DropModal.change}>
    {#if DropModal.error}
      <div
        class="p-3 mt-3 text-red-500 transition-all delay-150 rounded-md border border-red-500">
        {@html DropModal.msg}
      </div>
    {/if}
  </DropDatabase>
{/if}
