<script>
  import DarkMode from "./DarkMode.svelte";
</script>

<section>
  <DarkMode></DarkMode>
</section>

<style>
  section {
    @apply absolute md:static right-0 top-14 place-self-end flex flex-col md:flex-row items-center w-fit pointer-events-auto h-fit gap-1 pr-1;
  }
</style>
