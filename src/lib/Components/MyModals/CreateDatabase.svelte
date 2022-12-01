<script>
  import {
    NewDatabase,
    DbPageReload,
    NavCollReload,
    Reloadsidebar,
  } from "$Components/stores.js";
  import NewDatabaseMod from "$Components/GlobalModals/NewDatabase.svelte";
  let Modal = {
    error: false,
    msg: false,
    db: "",
    collection: "",
    cancel: (event) => {
      //reset or cancel
      $NewDatabase = false;
      Modal.error = false;
      Modal.msg = false;
      Modal.collection = "";
      Modal.db = "";
    },
    Seterror(error) {
      Modal.error = true;
      Modal.msg = error;
    },
    noerror: () => {
      Modal.error = false;
      Modal.msg = "";
    },
    validate: ({ db, collection }) => {
      return new Promise((resolve, reject) => {
        if (!db.match(/^[a-zA-Z0-9_]*$/)) {
          reject("Databases Pattern Not Matched");
        }
        if (db.length < 3) {
          reject("Databases name has Minimum Length 3 Chars");
        }
        if (!collection.match(/^[a-zA-Z0-9_]*$/)) {
          reject("Collection Pattern Not Matched");
        }
        if (collection.length < 3) {
          reject("Collection name has Minimum Length 3 Chars");
        }
        resolve(true);
      });
    },
    change: async (event) => {
      try {
        await Modal.validate(event.detail);
        Modal.noerror();
      } catch (error) {
        Modal.error = true;
        Modal.msg = error;
      }
    },
    submit: async (event) => {
      try {
        let data = event.detail;
        await Modal.validate(data);
        console.log("valid", data);
        await Modal.Pingserver(data);
        Modal.cancel();
      } catch (error) {
        Modal.Seterror(error);
      }
    },
    Pingserver: async (data) => {
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
        const response = await fetch("/api/createDb", options);
        if (response.status === 200) {
          let result = await response.json();
          if (result.status) {
            console.log(result);
            // $DbPageReload = !$DbPageReload;
            // $NavCollReload.state = !$NavCollReload.state;
            // $NavCollReload.db = data.db;

            $Reloadsidebar=!$Reloadsidebar
          }
          return Promise.resolve();
        } else {
          return Promise.reject(await response.json());
        }
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }
    },
  };
</script>

{#if $NewDatabase}
  <NewDatabaseMod
    bind:db={Modal.db}
    bind:collection={Modal.collection}
    on:cancel={Modal.cancel}
    on:submit={Modal.submit}
    on:change={Modal.change}>
    {#if Modal.error}
      <div
        class="p-3 mt-3 text-red-500 transition-all delay-150 rounded-md border border-red-500">
        {@html Modal.msg}
      </div>
    {/if}
  </NewDatabaseMod>
{/if}
