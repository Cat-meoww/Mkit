<script>
  import { onMount } from "svelte";
  let version=0;
  let host="0.0.0.0";
  async function get_server_data() {
    try {
      const options = {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serverStatus: 1 }),
      };
      const response = await fetch("/api/ServerStatus", options);
      const result = await response.json();
      version=result?.version??"0.0.0";
      host=result?.you??"0.0.0,0";
      console.log("Host Info", result);
    } catch (e) {
      console.error(e);
    }
  }

  onMount(get_server_data);
</script>

<div class="flex overflow-hidden bg-mongoshade">
  <div class="mx-3 my-1 overflow-hidden">
    <div class="overflow-hidden" data-id="deployment-awareness">
      <div class="flex flex-col p-0 px-6">
        <div class="flex flex-col p-0 py-1.5">
          <div class="text-mongo-neutral  font-bold text-xs">HOSTS</div>
          <div
            class="text-mongo-white text-sm text-ellipsis whitespace-nowrap overflow-hidden"
            data-test-id="topology-replica-set-host-address-0">
            {host}
          </div>
          
        </div>
        <!-- <div class="flex flex-col p-0 ">
          <div class="text-mongo-neutral  font-bold text-xs">CLUSTER</div>
          <div
            class="text-mongo-white text-sm text-ellipsis whitespace-nowrap overflow-hidden"
            data-test-id="topology-replica-set-type">
            Replica Set (atlas-gaovsh-shard-0)
          </div>
          <div
            class="text-mongo-white text-sm text-ellipsis whitespace-nowrap overflow-hidden">
            3 Nodes
          </div>
        </div> -->
      </div>
    </div>
    <div class="flex px-6 py-1.5 flex-col" data-test-id="server-version">
      <div class="uppercase text-mongo-neutral font-bold text-xs">EDITION</div>
      <div
        class="text-mongo-white text-sm text-ellipsis whitespace-nowrap overflow-hidden"
        data-test-id="server-version-text">
        MongoDB {version}
      </div>
    </div>
  </div>
</div>
