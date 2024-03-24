<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Header from "$lib/components/Header.svelte";
  import "../app.pcss";
  import { Toaster } from "svelte-sonner";
</script>

<ModeWatcher />
<main>
  <div class="menu-layer">
    <div class="menu-actions">
      <Header></Header>
    </div>
  </div>
  <Toaster />
  <slot />
</main>

<style>
  main {
    @apply absolute w-full h-full;
  }

  .menu-layer {
    @apply absolute z-10 inset-4 pointer-events-none;
  }

  .menu-actions {
    @apply grid grid-cols-[1fr,2fr,1fr] items-center h-[46px];
  }
</style>
