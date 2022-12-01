<script>
export let eclass='';
</script><div class="loader">
  <div class="element {eclass}" />
</div>

<style>
  .loader {
    inset: 0px;
    display: flex;
    transition: opacity 0.16s ease-out 0s;
  }
  .loader .element {
    width: 5ch;
    height: 16px;
    --darkreader-bg--gradient-start: #242c28;
    --darkreader-bg--gradient-end: #29332f;
    background-color: var(--darkreader-bg--gradient-start);
    background-image: linear-gradient(
      to right,
      var(--darkreader-bg--gradient-start) 0%,
      var(--darkreader-bg--gradient-end) 12.5%,
      var(--darkreader-bg--gradient-start) 25%,
      var(--darkreader-bg--gradient-start) 100%
    );

    align-self: center;
    border-radius: 3px;
    max-width: 80%;

    background-size: 400% 100%;
    background-position: 0px 0px;
    animation: 4s linear 0s infinite normal none running myload;
  }
  @keyframes myload {
    to {
      background-position-x: -500%;
    }
  }
</style>
