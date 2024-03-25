<script>
  import DarkMode from "./DarkMode.svelte";
</script>

<section>
  <DarkMode></DarkMode>
</section>

<style>
  section {
    @apply col-start-2 md:col-start-3 row-start-2 md:row-start-1 place-self-end flex flex-col md:flex-row items-center w-fit pointer-events-auto h-fit gap-1 pr-1;
  }
</style>
