<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Header from "$lib/components/Header.svelte";
  import "../app.pcss";
  import { Toaster } from "svelte-sonner";
</script>

<ModeWatcher />
<main class="grid grid-rows-[64px,1fr] h-dvh">
  <Header></Header>
  <slot />
  <Toaster />
</main>
