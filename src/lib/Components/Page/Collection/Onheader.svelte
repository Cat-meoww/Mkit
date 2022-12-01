<script>
    export let docs = 0;
    export let index = 0;
    export let db ;
    export let collection;
</script>
<div class="flex bg-mongodark-100 onheader flex-row">
    <div title="" class="title" data-testid="collection-header-title">
        <div class="namespace text-2xl font-bold">
            <button class="text-mongo-100"><span>
                    <h3>{db}</h3>
                </span></button>
            <h3 data-testid="collection-header-title-collection">.{collection}</h3>
        </div>
        <div class="leafygreen-ui-173ldie" data-testid="collection-header-actions" />
    </div>
    <div data-testid="collection-stats" class="flex flex-col pr-0 float-right">
        <span class="relative">
            <div class="flex flex-row mr-4">
                <div data-testid="document-stats-item" class="px-4 flex items-end mb-0">
                    <div class="text-center mr-3 flex flex-col " data-testid="document-count">
                        <h3 class="text-mongo-100 inline-block text-2xl font-semibold"
                            data-testid="document-count-value">
                            {docs}
                        </h3>
                        <small data-testid="document-count-label" class="text-xs capitalize">Documents</small>
                    </div>
                </div>
                <div data-testid="index-stats-item" class="px-4 flex items-end mb-0">
                    <div class="text-center mr-3 flex flex-col" data-testid="index-count">
                        <h3 class="text-mongo-100 inline-block text-2xl font-semibold" data-testid="index-count-value">
                            {index}
                        </h3>
                        <small data-testid="index-count-label" class="text-xs capitalize ">Indexes</small>
                    </div>
                </div>
            </div>
        </span>
    </div>
</div>
<style>
    .onheader {
        padding-top: 16px;
        padding-bottom: 4px;
        height: 72px;
        flex-shrink: 0;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }

    .onheader .title {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        padding: 0px 16px;
        margin: 0px;
        overflow: hidden;
    }

    .namespace {
        border: none;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
        background-color: transparent;
        border-color: initial;
    }

    .namespace button {
        text-decoration-color: initial;
        background-color: transparent;
        border-color: initial;

    }
</style>