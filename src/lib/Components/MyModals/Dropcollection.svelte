<script>
  import {
    DropCollection,
    DbPageReload,
    NavCollReload,
    DropData,
  } from "$Components/stores.js";
  import DropCollectionmodal from "$Components/GlobalModals/DropCollection.svelte";

  $: OrginCollection = $DropData?.collection ?? "";
  $: OrginDb = $DropData?.db ?? "";
   //console.log({OrginDb})
  let DropModal = {
    error: false,
    msg: false,
    Collection: "",
    cancel: (event) => {
      $DropCollection = !$DropCollection;
      DropModal.error = false;
      DropModal.msg = false;
      DropModal.Collection = "";
    },
    submit: async (event) => {
      try {
        let coll = event.detail.collectionname;
        await DropModal.validate(coll);
        let data = $DropData;
        console.log("valid", data);
        await DropModal.pingnewcollection(data);

        DropModal.reset();
      } catch (error) {
        console.log("invalid");
        DropModal.error = true;
        DropModal.msg = error;
      }
    },
    reset: () => {
      DropModal.error = false;
      DropModal.msg = false;
      DropModal.Collection = "";
      $DropCollection = !$DropCollection;
    },
    noerror: () => {
      DropModal.error = false;
      DropModal.msg = "";
    },

    validate: (collectionname) => {
      return new Promise((resolve, reject) => {
        // console.log(collectionname, OrginCollection);
        if (collectionname !== OrginCollection) {
          return reject("Collection name not matched");
        }
        resolve(true);
      });
    },
    change: async (event) => {
      try {
        let ok = await DropModal.validate(event.detail.collectionname);
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
        const response = await fetch("/api/dropcollection", options);
        if (response.status === 200) {
          let result = await response.json();

          if (result.status) {
            console.log(result);
            $DbPageReload = !$DbPageReload;
            $NavCollReload.state = !$NavCollReload.state;
            $NavCollReload.db = data.db;
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

{#if $DropCollection}
  <DropCollectionmodal
    bind:OrginCollection
    bind:OrginDb
    bind:collectionname={DropModal.Collection}
    on:cancel={DropModal.cancel}
    on:submit={DropModal.submit}
    on:validate={DropModal.change}>
    {#if DropModal.error}
      <div
        class="p-3 mt-3 text-red-500 transition-all delay-150 rounded-md border border-red-500">
        {@html DropModal.msg}
      </div>
    {/if}
  </DropCollectionmodal>
{/if}
