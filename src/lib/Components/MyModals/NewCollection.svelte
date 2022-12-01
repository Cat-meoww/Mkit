<script>
  import {
    NewCollection,
    NewCollectionData,
    DbPageReload,
    NavCollReload,
  } from "$Components/stores.js";
  import CollectionPopUp from "$Components/GlobalModals/NewCollection.svelte";
  let modalCollection = {
    error: false,
    msg: false,
    Collection: "",
    cancel: (event) => {
      $NewCollection = !$NewCollection;
      modalCollection.error = false;
      modalCollection.msg = false;
      modalCollection.Collection = "";
    },
    submit: async (event) => {
      try {
        let coll = event.detail.collectionname;
        await modalCollection.validate(coll);
        let data = { Collection: coll, Database: $NewCollectionData?.db ?? "" };
        console.log("valid", data);
        await modalCollection.pingnewcollection(data);
        modalCollection.reset();
      } catch (error) {
        console.log("invalid");
        modalCollection.error = true;
        modalCollection.msg = error;
      }
    },
    reset: () => {
      modalCollection.error = false;
      modalCollection.msg = false;
      $NewCollection = !$NewCollection;
      modalCollection.Collection = "";
    },
    noerror: () => {
      modalCollection.error = false;
      modalCollection.msg = "";
    },
    validate: (collectionname) => {
      return new Promise((resolve, reject) => {
        if (!collectionname.match(/^[a-zA-Z0-9_]*$/)) {
          reject("Pattern Not Matched");
        }
        if (collectionname.length < 3) {
          reject("Minimum Length 3 Chars");
        }
        resolve(true);
      });
    },
    change: async (event) => {
      try {
        await modalCollection.validate(event.detail.collectionname);
        modalCollection.noerror();
      } catch (error) {
        modalCollection.error = true;
        modalCollection.msg = error;
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
        const response = await fetch("/api/createcollection", options);
        if (response.status === 200) {
          let result = await response.json();

          if (result.status) {
            console.log(result);
            $DbPageReload = !$DbPageReload;
            $NavCollReload.state = !$NavCollReload.state;
            $NavCollReload.db = data.Database;
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
</script>

{#if $NewCollection}
  <CollectionPopUp
    bind:collectionname={modalCollection.Collection}
    on:cancel={modalCollection.cancel}
    on:submit={modalCollection.submit}
    on:change={modalCollection.change}>
    {#if modalCollection.error}
      <div
        class="p-3 mt-3 text-red-500 transition-all delay-150 rounded-md border border-red-500">
        {@html modalCollection.msg}
      </div>
    {/if}
  </CollectionPopUp>
{/if}
