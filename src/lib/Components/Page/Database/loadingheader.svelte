<div class="flex  bg-mongodark-100 onheader shrink-0 items-center justify-between py-4   flex-row">
    <div title="" class="title p-0 px-4 " data-testid="collection-header-title">
        <div class="flex animate-pulse text-2xl font-bold">
            <button class="text-mongo-100"><span>
                    <div class="w-56 h-6  bg-stone-500 rounded" />
                </span></button>
        </div>
        <div class="leafygreen-ui-173ldie" data-testid="collection-header-actions" />
    </div>
    <div data-testid="collection-stats" class="flex flex-col pr-0 float-right">
        <span class="relative">
            <div class="flex flex-row mr-4">
                <div data-testid="document-stats-item" class="px-4 flex items-end mb-0">
                    <div class="text-center mr-3 flex flex-col " data-testid="document-count">
                        <div class="text-mongo-100 animate-pulse h-6 rounded bg-stone-500 inline-block text-2xl font-semibold"
                            data-testid="document-count-value">
                            
                        </div>
                        <small data-testid="document-count-label" class="text-xs mt-1 capitalize">Collections</small>
                    </div>
                </div>
                <div data-testid="index-stats-item" class="px-4 flex items-end mb-0">
                    <div class="text-center animate-pulse mr-3 flex flex-col" data-testid="index-count">
                        <div class="text-mongo-100 h-6 bg-stone-500 inline-block text-2xl font-semibold rounded"
                            data-testid="index-count-value"></div>
                        <small data-testid="index-count-label" class="text-xs mt-1 capitalize ">Indexes</small>
                    </div>
                </div>
            </div>
        </span>
    </div>
</div>

<style>
    .onheader{
        height: 72px;
    }
</style>