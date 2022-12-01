<script>
    import {
        PUBLIC_APP_VERSION,
        PUBLIC_APPNAME_PREFIX,
        PUBLIC_APPNAME_SUFFIX,
    } from "$env/static/public";
    import ChangeTheme from "../Themes/ChangeTheme.svelte";
</script>

<div class="
  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 
  bg-base-100 text-base-content
  ">
    <nav class="navbar w-full">
        <div class="flex flex-1 md:gap-1 lg:gap-2">
            <span class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="Menu"><label
                    for="drawer" class="btn btn-square btn-ghost drawer-button lg:hidden"><svg width="20" height="20"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg></label></span>
            <div class="flex items-center gap-2 lg:hidden">
                <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2 ">
                    <div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                        <span class="lowercase text-primary">{PUBLIC_APPNAME_PREFIX}</span>
                        <span class="uppercase text-base-content">{PUBLIC_APPNAME_SUFFIX}</span>
                    </div>
                </a>
                <a href="/docs/changelog" class="link link-hover font-mono text-xs text-opacity-50 ">
                    <div data-tip="Changelog" class="tooltip tooltip-bottom">
                        {PUBLIC_APP_VERSION}
                    </div>
                </a>
            </div>
        </div>
        <div class="flex-0">
            <ChangeTheme />
        </div>
    </nav>
</div>