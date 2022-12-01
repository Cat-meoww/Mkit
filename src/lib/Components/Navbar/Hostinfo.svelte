<script>
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
      console.log("Host Info", result);
    } catch (e) {
      console.error(e);
    }
  }

  //get_server_data();
</script>

<div class="flex overflow-hidden bg-mongoshade">
  <div class="mx-3 my-1 overflow-hidden">
    <div class="overflow-hidden" data-id="deployment-awareness">
      <div class="flex flex-col p-0 px-6">
        <div class="flex flex-col p-0 py-1.5">
          <div class="text-mongo-neutral  font-bold text-xs">HOSTS</div>
          <div
            class="text-mongo-white text-sm text-ellipsis whitespace-nowrap overflow-hidden"
            data-test-id="topology-replica-set-host-address-0"
            title="ac-okcshsn-shard-00-00.veg53ys.mongodb.net:27017">
            ac-okcshsn-shard-00-00.veg53ys.mongodb.net:27017
          </div>
          <div
            class="text-mongo-white text-sm text-ellipsis whitespace-nowrap overflow-hidden"
            data-test-id="topology-replica-set-host-address-1"
            title="ac-okcshsn-shard-00-01.veg53ys.mongodb.net:27017">
            ac-okcshsn-shard-00-01.veg53ys.mongodb.net:27017
          </div>
          <div
            class="text-mongo-white text-sm text-ellipsis whitespace-nowrap overflow-hidden"
            data-test-id="topology-replica-set-host-address-2"
            title="ac-okcshsn-shard-00-02.veg53ys.mongodb.net:27017">
            ac-okcshsn-shard-00-02.veg53ys.mongodb.net:27017
          </div>
        </div>
        <div class="flex flex-col p-0 ">
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
        </div>
      </div>
    </div>
    <div class="flex px-6 py-1.5 flex-col" data-test-id="server-version">
      <div class="uppercase text-mongo-neutral font-bold text-xs">EDITION</div>
      <div
        class="text-mongo-white text-sm text-ellipsis whitespace-nowrap overflow-hidden"
        data-test-id="server-version-text">
        MongoDB 5.0.14 Enterprise
      </div>
    </div>
  </div>
</div>
