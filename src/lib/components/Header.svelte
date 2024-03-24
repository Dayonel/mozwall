<script lang="ts">
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { Button } from "./ui/button";
  import { Logo } from "$lib";
</script>

<header>
  <Logo></Logo>

  <nav class="flex items-center justify-between space-x-2">
    <Button on:click={toggleMode} variant="outline" size="icon">
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </nav>
</header>

<style>
  header {
    @apply flex justify-between items-center w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-16 container max-w-screen-2xl;
  }
</style>
