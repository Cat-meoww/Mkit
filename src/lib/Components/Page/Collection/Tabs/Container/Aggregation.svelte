<script>
  import ResultTab from "./Aggregation/Resulttab.svelte";
  import Documents from "./Aggregation/Documents.svelte";
  import JSON5 from "json5";
  export let db;
  export let collection;
  const APPSKIP = 10;
  const Regex = /('(?=(,\s*')))|('(?=:))|((?<=([:,]\s*))')|((?<={)')|('(?=}))/g;
  let data = [];
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
        if (Agg.submit(getbefore)) {
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
        if (Agg.submit(getafter)) {
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
  let Agg = {
    error: false,
    errmsg: "",
    Pipeline: "",
    seterror: (msg) => {
      Agg.error = true;
      Agg.errmsg = msg;
    },
    unseterror: () => {
      Agg.error = false;
      Agg.errmsg = "";
    },
    formate: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let dummy = await JSON5.parse(Agg.Pipeline);
          Agg.Pipeline = JSON.stringify(dummy, null, 2);
          await Agg.validate(dummy);
          Agg.unseterror();
          resolve(true);
        } catch (error) {
          Agg.seterror(error);
          reject("Error Happens");
        }
      });
    },
    change: async (event) => {
      try {
        await Agg.validate();
      } catch (error) {
        Agg.seterror(error);
      }
    },
    validate: async (Pipeline) => {
      return new Promise((resolve, reject) => {
        if (Array.isArray(Pipeline)) {
          for (var i = 0; i < Pipeline.length; i++) {
            if (
              Object.prototype.toString.call(Pipeline[i]) !== "[object Object]"
            ) {
              reject("Invalid Stage");
              break;
            }
          }
          return resolve(true);
        }
        return reject("Invalid Pipeline");
      });
    },
    handlesubmit: async () => {
      await Agg.formate();
      if (!Agg.error) {
        data = [];
        Tablecontroller.reset();
        await Agg.submit();
      }
    },
    submit: async (APPSKIP = 0) => {
      try {
        let data = {
          Pipeline: JSON.parse(Agg.Pipeline),
          db,
          collection,
          APPSKIP: Agg.convert2int(APPSKIP),
        };
        const options = {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const response = await fetch("/api/Aggregate", options);
        const result = await response.json();
        if (!result?.error ?? false) {
          Tablecontroller.set(result);
          Agg.unseterror();
          resolve(true);
        } else {
          Agg.seterror(result?.msg ?? "Error Bad request");
          reject(true);
        }
      } catch (error) {}
    },
    convert2int(data) {
      data = parseInt(data);
      if (!isNaN(data)) {
        return data;
      }
      return 0;
    },
  };
</script>

<div class="flex lg:flex-row md:flex-col justify-center overflow-hidden">
  <div class="flex-1 gap-3 p-2 flex flex-col min-w-[50vh] max-w-2/4 ">
    <div class="flex gap-3">
      <div class="flex-1 " />
      <div>
        <button
          on:click|stopPropagation={Agg.formate}
          class="cursor-pointer btn-sm btn bg-emerald-700 border-none gap-1 normal-case bg-opacity-90 hover:bg-emerald-900 backdrop-blur flex flex-row rounded-md outline-none color center px-3">
          Formate
        </button>
      </div>
      <div>
        <button
          on:click|stopPropagation={Agg.handlesubmit}
          class="cursor-pointer btn-sm btn bg-emerald-700 border-none gap-1 normal-case bg-opacity-90 hover:bg-emerald-900 backdrop-blur flex flex-row rounded-md outline-none color center px-3">
          Run
        </button>
      </div>
      
    </div>
    <div class="form-control flex flex-col justify-center items-center overflow-hidden">
      <!-- svelte-ignore a11y-label-has-associated-control -->

      <textarea
        on:keyup={Agg.change}
        bind:value={Agg.Pipeline}
        wrap="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        class:textarea-error={Agg.error}
        class="resize-none h-[72vh] textarea w-full  textarea-bordered leading-5 font-medium font-mono"
        placeholder={"[\n   // Stage 1\n   {\n     *****\n   },\n   // Stage 2\n   {\n     *****\n   }\n]"} />
    </div>
    {#if Agg.error}
      <div
        class="flex justify-center rounded bg-yellow-400 border border-solid border-yellow-600 bg-opacity-40 text-violet-50 p-2 mb-3">
        {Agg.errmsg}
      </div>
      <div class="p-2 flex" />
    {/if}
  </div>
  <div class="flex-1 border-solid border-l border-mongo-white ">
    <div class="flex flex-col">
      <ResultTab
        bind:total={Tablecontroller.ResultCount}
        on:forward={Tablecontroller.after}
        on:backward={Tablecontroller.before}
        bind:from={Tablecontroller.from}
        bind:to={Tablecontroller.to} />
      <Documents bind:docs={data} />
    </div>
  </div>
</div>
