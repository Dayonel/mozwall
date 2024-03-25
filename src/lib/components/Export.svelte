<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip";
    import { Download } from "lucide-svelte";
  import { Button } from "./ui/button";
</script>

<Tooltip.Root>
  <Tooltip.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" size="icon">
      <Download class="h-[1.2rem] w-[1.2rem]" />
      <span class="sr-only">Export</span>
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    <p>Export</p>
  </Tooltip.Content>
</Tooltip.Root>
