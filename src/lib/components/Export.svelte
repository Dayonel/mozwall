<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Download } from "lucide-svelte";
  import { Button } from "./ui/button";
</script>

<div class="export">
  <Tooltip.Root>
    <Tooltip.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline" class="w-full max-w-xl h-12" disabled>
        <Download class="h-[1.2rem] w-[1.2rem] mr-2" />
        Export
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Export</p>
    </Tooltip.Content>
  </Tooltip.Root>
</div>

<style>
  .export {
    @apply w-full flex justify-center;
  }
</style>
