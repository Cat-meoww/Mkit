<script>
  import { createEventDispatcher } from "svelte";
  export let collectionname = "";
  export let OrginCollection;
  export let OrginDb;
  const dispatch = createEventDispatcher();

  function cancel() {
    dispatch("cancel", true);
  }

  function submit() {
    dispatch("submit", {
      collectionname,
    });
  }

  function validate() {
    dispatch("validate", {
      collectionname,
    });
  }

  function enter(event) {
    if (event.keyCode === 13) {
      submit();
      return;
    }
    validate();
  }
</script>

<div
  class="fixed top-0 left-0 z-40 transition-opacity ease-in-out duration-300">
  <div
    class="relative z-50 transition-opacity ease-in-out duration-300 "
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true">
    <div
      class="fixed inset-0 bg-mongo-card-backdrop text-mongo-card-textcolor transition-opacity" />

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-mongodark-100 text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="p-9">
            <div
              class="card-title text-mongo-card-textcolor font-bold text-2xl mb-5">
              Drop Collection 
            </div>
            <div
              class=" text-mongo-card-textcolor font-bold text-2xl mb-7">
              <span class="text-mongo-100">{OrginDb}</span>.{OrginCollection}
            </div>
            <div>
              <div class="form-control w-full ">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                  <span class="label-text bold">Enter Collection Name</span>
                  <span class="label-text-alt">Type {OrginCollection}</span>
                </label>
                <input
                  bind:value={collectionname}
                  type="text"
                  on:keyup={enter}
                  placeholder="Type here"
                  class="input input-bordered w-full " />
              </div>
            </div>
            <slot />
          </div>

          <div
            class="footer px-4 py-3 gap-0 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              on:click={submit}
              type="button"
              class="inline-flex w-full justify-center bg-red-700 rounded-md border border-transparent  px-4 py-2 text-base font-medium text-mongo-white shadow-sm hover:bg-red-800 hover:text-mongo-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >Drop Collection</button>
            <button
              on:click={cancel}
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-mongo-card-btnborder  px-4 py-2 text-base font-medium text-mongo-card-textcolor shadow-sm hover:bg-mongo-card-hoverbg hover:text-mongo-white focus:outline-none focus:ring-2 transition-colors focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >Cancel</button>
          </div>
          <button
            aria-label="Close modal"
            tabindex="0"
            aria-disabled="false"
            on:click={cancel}
            class="closeicon absolute h-7 w-7 transition-colors ease-in-out duration-200 inline-block top-0 right-0 mx-4 my-5 hover:bg-mongo-card-hoverbg rounded-full">
            <div
              class="absolute flex justify-center items-center inset-0 fill-mongo-card-textcolor">
              <svg
                class="text-mongo-card-textcolor"
                height="16"
                width="16"
                role="img"
                aria-label="X Icon"
                viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.2028 3.40381C11.8123 3.01329 11.1791 3.01329 10.7886 3.40381L8.3137 5.87869L5.83883 3.40381C5.44831 3.01329 4.81514 3.01329 4.42462 3.40381L3.71751 4.11092C3.32699 4.50144 3.32699 5.13461 3.71751 5.52513L6.19238 8.00001L3.71751 10.4749C3.32699 10.8654 3.32699 11.4986 3.71751 11.8891L4.42462 12.5962C4.81514 12.9867 5.44831 12.9867 5.83883 12.5962L8.3137 10.1213L10.7886 12.5962C11.1791 12.9867 11.8123 12.9867 12.2028 12.5962L12.9099 11.8891C13.3004 11.4986 13.3004 10.8654 12.9099 10.4749L10.435 8.00001L12.9099 5.52513C13.3004 5.13461 13.3004 4.50144 12.9099 4.11092L12.2028 3.40381Z"
                  fill="currentColor"
                  data-darkreader-inline-fill=""
                  style="--darkreader-inline-fill:currentColor;" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .closeicon::before {
    content: "";
    transition: all 150ms ease-in-out 0s;
    position: absolute;
    inset: 0px;
    border-radius: 100%;
    opacity: 0;
    transform: scale(0.8);
  }

  .closeicon:hover::before {
    background-color: #2b3531;
  }
</style>
