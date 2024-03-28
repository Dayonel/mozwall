<script lang="ts">
  import "../app.pcss";
  import "./styles.css";
  import { ModeWatcher } from "mode-watcher";
  import Header from "$lib/components/Header.svelte";
  import { Toaster } from "svelte-sonner";
  import Export from "$lib/components/Export.svelte";
</script>

<ModeWatcher />
<main>
  <div class="menu-layer">
    <div class="menu-actions">
      <Header></Header>
    </div>
    <Export></Export>
  </div>
  <Toaster />
  <slot />
</main>

<style>
  main {
    @apply absolute w-full h-full;
  }

  .menu-layer {
    @apply absolute z-10 inset-4 pointer-events-none grid grid-rows-1;
  }

  .menu-actions {
    @apply grid grid-cols-[46px,auto] md:grid-cols-[1fr,2fr,1fr] gap-4 items-center h-[46px];
  }
</style>
