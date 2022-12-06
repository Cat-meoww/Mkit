<script>
    export let key;
    export let value;
    import Formatevalue from "./Formatevalue.svelte"
    let VType = typeof value
    let NumOrStr=VType ==='object'?"":"flex flex-col"
</script>
<div class="{NumOrStr}overflow-hidden"><span class="ml-2 flex-0 whitespace-nowrap">{key}</span>
<span>:</span>
<Formatevalue  {value}/>
</div>

