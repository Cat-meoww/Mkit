<ul class="placeholder-wave menu p-0">
  <li>
    <div class="flex gap-1 hover:bg-base-300">
      <span class="h-5 w-5" />
      <span class="flex-1 bg-base-100 placeholder rounded" />
    </div>
  </li>
  <li>
    <div class="flex gap-1 hover:bg-base-300">
      <span class="h-5 w-5" />
      <span class="flex-1 bg-base-100 placeholder rounded" />
    </div>
  </li>
</ul>

<style>
  .placeholder {
    display: inline-block;
    min-height: 1em;
    vertical-align: middle;
    cursor: wait;
    background-color: currentcolor;
    opacity: 0.5;
  }
  .placeholder-wave {
    -webkit-mask-image: linear-gradient(
      130deg,
      #000 55%,
      rgba(0, 0, 0, 0.8) 75%,
      #000 95%
    );
    mask-image: linear-gradient(
      130deg,
      #000 55%,
      rgba(0, 0, 0, 0.8) 75%,
      #000 95%
    );
    -webkit-mask-size: 200% 100%;
    mask-size: 200% 100%;
    animation: placeholder-wave 2s linear infinite;
  }
  @keyframes placeholder-wave {
    100% {
      -webkit-mask-position: -200% 0%;
      mask-position: -200% 0%;
    }
  }
</style>
