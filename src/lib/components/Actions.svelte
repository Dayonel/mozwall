<script lang="ts">
  import { Hand, MousePointer } from "lucide-svelte";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { moz } from "../../store";

  const toggle = (value: string | undefined) => {
    if (value === "drag") {
      $moz.setPanning(true);
    } else if (value === "pointer") {
      $moz.setPanning(false);
    }
  };
</script>

<!-- Actions -->
<section>
  <ToggleGroup.Root
    type="single"
    size="sm"
    value="pointer"
    onValueChange={(value) => toggle(value)}
  >
    <Tooltip.Root>
      <Tooltip.Trigger asChild let:builder>
        <div use:builder.action {...builder}>
          <ToggleGroup.Item value="pointer" aria-label="Toggle mouse pointer">
            <MousePointer class="h-[1.2rem] w-[1.2rem]" />
          </ToggleGroup.Item>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Selection</p>
      </Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger asChild let:builder>
        <div use:builder.action {...builder}>
          <ToggleGroup.Item value="drag" aria-label="Toggle drag">
            <Hand class="h-[1.2rem] w-[1.2rem]" />
          </ToggleGroup.Item>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Pan</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </ToggleGroup.Root>
</section>

<style>
  section {
    @apply flex items-center w-fit place-self-center pointer-events-auto border h-full rounded-lg bg-background p-1;
  }
</style>
