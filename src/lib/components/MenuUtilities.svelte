<script>
  import DarkMode from "./DarkMode.svelte";
  import Export from "./Export.svelte";
</script>

<section>
  <Export></Export>
  <DarkMode></DarkMode>
</section>

<style>
  section {
    @apply absolute md:static right-0 top-14 place-self-end flex flex-col md:flex-row items-center w-fit pointer-events-auto h-full gap-1;
  }
</style>
