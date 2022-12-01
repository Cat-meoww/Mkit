<script>
  import {
    PUBLIC_APP_VERSION,
    PUBLIC_APPNAME_PREFIX,
    PUBLIC_APPNAME_SUFFIX,
  } from "$env/static/public";
</script>

<div class="drawer-side scrollbar" style="scroll-behavior: smooth; scroll-padding-top: 5rem;">
  <label for="drawer" class="drawer-overlay" />
  <aside class="bg-base-200 w-80 ">
    <div class="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex ">
      <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2">
        <div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
          <span class="lowercase">{PUBLIC_APPNAME_PREFIX}</span>
          <span class="text-base-content uppercase">{PUBLIC_APPNAME_SUFFIX}</span>
        </div>
      </a>
      <a href="/docs/changelog" class="link link-hover font-mono text-xs text-opacity-50">
        <div data-tip="Changelog" class="tooltip tooltip-bottom">
          {PUBLIC_APP_VERSION}
        </div>
      </a>
    </div>

    <div class="h-4" />

    <slot />

    <div class="from-base-200 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent" />
  </aside>
</div>

<style>
  .scrollbar::-webkit-scrollbar-track {
    background-color: #3c474a;
  }

  .scrollbar::-webkit-scrollbar {
    width: 0px;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    border: 0px;
  }

  .bg-base-200 {
    background-color: #3c474a;
  }
</style>