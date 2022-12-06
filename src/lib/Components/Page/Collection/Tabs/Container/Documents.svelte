<script>
  import Inputs from "./Documents/inputs.svelte";
  import { onMount } from "svelte";
  import ResultTab from "./Documents/Resulttab.svelte";
  import Documents from "./Documents/Documents.svelte";
  import Arrow from "$Components/Page/Database/Icons/RightArrow.svelte";
  import TabsContainer from "../TabsContainer.svelte";
  const APPSKIP = 10;
  let Controller = {
    Optionstate: false,
    toggle: () => {
      Controller.Optionstate = !Controller.Optionstate;
    },
  };
  let data = [{}];
  let Tablecontroller = {
    ResultCount: 0,
    TotalSkipped: 0,
    SKIPPER: 0,
    from: 0,
    to: 0,
    disableforward: false,
    disablebackward: false,
    before: async () => {
      let getbefore = Tablecontroller.SKIPPER - APPSKIP;
      // console.log({ ResultCount: Tablecontroller.ResultCount, getbefore });
      if (getbefore >= 0 && !Tablecontroller.disablebackward) {
        if (form.submit(getbefore)) {
          Tablecontroller.SKIPPER -= APPSKIP;
        }
      }
    },
    after: async () => {
      let getafter = Tablecontroller.SKIPPER + APPSKIP;
      if (
        Tablecontroller.afterCondition(Tablecontroller.ResultCount) &&
        !Tablecontroller.disableforward
      ) {
        // console.log(Tablecontroller.ResultCount, getafter);
        if (form.submit(getafter)) {
          Tablecontroller.SKIPPER += APPSKIP;
        }
      }
    },
    set: (result) => {
      let count = (Tablecontroller.ResultCount = result?.Total ?? 0);

      let afterCondition = Tablecontroller.afterCondition(count);
      let beforeCondition =
        Tablecontroller.SKIPPER - APPSKIP < 0 ? true : false;
      if (count > 0) {
        //updating data
        data = result?.data ?? [{}];

        //logic for tabel controller
        Tablecontroller.from = Tablecontroller.SKIPPER + 1;
        if (Tablecontroller.SKIPPER + APPSKIP >= count) {
          Tablecontroller.to = count;
        } else {
          Tablecontroller.to = Tablecontroller.SKIPPER + APPSKIP;
        }
      } else {
        data = [];
        Tablecontroller.reset();
      }
      if (Tablecontroller.SKIPPER - APPSKIP < 0) {
        Tablecontroller.disablebackward = true;
        if (afterCondition) {
          Tablecontroller.disableforward = false;
        } else {
          Tablecontroller.disableforward = false;
        }
      } else {
        Tablecontroller.disablebackward = false;
      }

      if (afterCondition) {
        Tablecontroller.disableforward = false;
      } else {
        Tablecontroller.disableforward = true;
      }
    },
    afterCondition: (count) => {
      if (count > Tablecontroller.SKIPPER + APPSKIP) {
        return true;
      }
      let lastdig = Number.isInteger(count)
        ? count % 10
        : count.toString().slice(-1);
      if (
        lastdig <= APPSKIP + lastdig &&
        count > APPSKIP &&
        count < APPSKIP + APPSKIP - 1
      ) {
        return true;
      }
      return false;
    },
    handleFind: async () => {
      Tablecontroller.reset();
      if (await validate.all()) {
        saved.set();
        form.submit();
      }
    },
    reset: () => {
      Tablecontroller.ResultCount = 0;
      Tablecontroller.TotalSkipped = 0;
      Tablecontroller.SKIPPER = 0;
      Tablecontroller.from = 0;
      Tablecontroller.to = 0;
      Tablecontroller.disableforward = false;
      Tablecontroller.disablebackward = false;
    },
  };

  export let db;
  export let collection;

  let saved = {
    filter: "",
    project: "",
    sort: "",
    maxtime: "",
    collation: "",
    skip: "",
    limit: "",
    set: () => {
      saved.skip = form.skip;
      saved.limit = form.limit;
      saved.filter = form.filter;
    },
  };
  let form = {
    filter: "",
    project: "",
    sort: "",
    maxtime: "",
    collation: "",
    skip: "",
    limit: "",
    reset: () => {
      form.filter = "";
      form.project = "";
      form.sort = "";
      form.maxtime = "";
      form.collation = "";
      form.skip = "";
      form.limit = "";
    },

    submit: async (APPSKIP = 0) => {
      try {
        if (await validate.all()) {
          let payload = {
            db,
            collection,
            filter: JSON.parse(saved.filter == "" ? "{}" : saved.filter),
            limit: form.convert2int(saved.limit),
            skip: form.convert2int(saved.skip),
            APPSKIP: form.convert2int(APPSKIP),
          };
          await form.trytofind(payload);
          return true;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async trytofind(data) {
      new Promise(async (resolve, reject) => {
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
          const response = await fetch("/api/Find", options);
          const result = await response.json();
          Tablecontroller.set(result);

          resolve(true);
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
    },
    convert2int(data) {
      data = parseInt(data);
      if (!isNaN(data)) {
        return data;
      }
      return 0;
    },
  };
  let validate = {
    filter: false,
    project: false,
    sort: false,
    maxtime: false,
    collation: false,
    skip: false,
    limit: false,

    isJSON: (data) => {
      try {
        let PARSER = JSON.parse(data);
        if (typeof PARSER !== "object") {
          throw "It's not an object";
        }
        console.log("valid json", { op: typeof data, data });
        return true;
      } catch (e) {
        //console.log(e);
        return false;
      }
    },
    Vfilter: () => {
      if (validate.isJSON(form.filter) || form.filter === "") {
        //no error happen
        validate.filter = false;
      } else {
        //error happen
        validate.filter = true;
      }
    },
    Vlimit: () => {
      form.limit = form.convert2int(form.limit);
      if (Number.isInteger(form.limit) || form.limit === "") {
        validate.limit = false;
      } else {
        validate.limit = true;
      }
    },
    Vskip: () => {
      form.skip = form.convert2int(form.skip);
      if (Number.isInteger(form.skip) || form.limit === "") {
        validate.skip = false;
      } else {
        validate.skip = true;
      }
    },
    all: () => {
      return new Promise((resolve, reject) => {
        if (!validate.Vfilter() && !validate.Vlimit()) {
          return resolve(true);
        } else {
          return reject(false);
        }
      });
    },
  };
  onMount(() => {
    form.submit();
  });
</script>

<div class="filter px-2.5 py-3 border-b border-solid border-mongo-tabs-border">
  <div class="flex">
    <div class="flex-1">
      <div
        class="flex border-x border-t flex-col rounded border-solid border-mongo-tabs-filter-border">
        <div
          class="border-b border-solid flex flex-row border-mongo-tabs-filter-border px-2 py-1">
          <Inputs
            bind:error={validate.filter}
            on:keyup={validate.Vfilter}
            css="flex-1"
            name="Filter"
            bind:value={form.filter}
            placeholder={"{ field: 'value' }"} />
          <div>
            <button
              on:click|stopPropagation={Controller.toggle}
              class="h-5 text-xs font-bold flex justify-center items-center text-mongo-neutral border rounded border-mongo-tabs-filter-border border-solid px-2">
              <span><Arrow /></span>
              <span>OPTIONS</span>
            </button>
          </div>
        </div>
        <div
          class:hidden={!Controller.Optionstate}
          class="border-b border-solid flex flex-row border-mongo-tabs-filter-border px-2 py-1">
          <Inputs
            name="Project"
            css="flex-1"
            bind:value={form.project}
            placeholder={"{ field: 0 }"} />
        </div>
        <div
          class:hidden={!Controller.Optionstate}
          class="border-b border-solid flex flex-row border-mongo-tabs-filter-border px-2 py-1">
          <Inputs
            css="flex-1"
            name="sort"
            bind:value={form.sort}
            placeholder={"{ field: -1 } or [['field', -1]]"} />
          <Inputs
            css="flex-0"
            name="MAX TIME MS"
            bind:value={form.maxtime}
            placeholder={"60000"} />
        </div>
        <div
          class:hidden={!Controller.Optionstate}
          class="border-b border-solid flex flex-row  border-mongo-tabs-filter-border px-2 py-1">
          <Inputs
            css="flex-1"
            name="COLLATION"
            bind:value={form.collation}
            placeholder={"{ locale: 'simple' }"} />
          <Inputs
            css="flex-1"
            name="SKIP"
            bind:value={form.skip}
            on:keyup={validate.Vskip}
            bind:error={validate.skip}
            placeholder={"0"} />
          <Inputs
            css="flex-1"
            name="LIMIT"
            on:keyup={validate.Vlimit}
            bind:value={form.limit}
            bind:error={validate.limit}
            placeholder={"0"} />
        </div>
      </div>
    </div>
    <div class="flex-none flex gap-2 px-3">
      <button
        on:click={Tablecontroller.handleFind}
        class="btn-primary btn btn-sm rounded">Find</button>
      <button
        on:click={form.reset}
        class="btn btn-sm rounded border-mongo-tabs-filter-border"
        >Reset</button>
    </div>
  </div>
</div>

<ResultTab
  bind:total={Tablecontroller.ResultCount}
  on:forward={Tablecontroller.after}
  on:backward={Tablecontroller.before}
  bind:from={Tablecontroller.from}
  bind:to={Tablecontroller.to}
  bind:disableforward={Tablecontroller.disableforward} />

<Documents bind:docs={data} />

<style>
  .btn-primary {
    background-image: linear-gradient(
      -180deg,
      rgb(36, 133, 74) 0%,
      rgb(39, 119, 69) 100%
    );
    background-color: initial;
    box-shadow: rgb(13 13 13 / 15%) 0px -1px 0px 0px inset;
    border-color: rgb(52, 173, 98);
    color: rgb(229, 224, 216);
  }
</style>
