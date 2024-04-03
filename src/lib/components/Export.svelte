<script lang="ts">
  import { Download } from "lucide-svelte";
  import { Button } from "./ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import { members } from "../../store";
  import ExportContent from "./ExportContent.svelte";
  import { toast } from "svelte-sonner";
  import { onMount } from "svelte";

  let open = false;
  onMount(() => {
    window.addEventListener("keydown", handleCtrlS);
  });

  const handleCtrlS = (event: KeyboardEvent) => {
    try {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();

        if (!$members || $members.size === 0) {
          toast.info("No members for search criteria", {
            description: "Please search for members first",
          });
          return;
        }

        open = true;
      }
    } catch (error: any) {
      toast.error("Error exporting data", {
        description: error.message,
      });
    }
  };
</script>

<div class="export" class:enabled={$members && $members.size > 0}>
  <Sheet.Root bind:open>
    <Sheet.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="outline"
        class="w-full max-w-xl h-12"
        disabled={!$members || $members.size === 0}
      >
        <Download class="h-[1.2rem] w-[1.2rem] mr-2" />
        Export
      </Button>
    </Sheet.Trigger>
    <ExportContent></ExportContent>
  </Sheet.Root>
</div>

<style>
  .export {
    @apply w-full flex justify-center;
  }

  .enabled {
    @apply pointer-events-auto;
  }
</style>
