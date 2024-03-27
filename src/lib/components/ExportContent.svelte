<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet";
  import { Button } from "./ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import { moz, members } from "../../store";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { fabric } from "fabric";

  const save = () => {
    console.log("Exporting members");
    $moz.getObjects().forEach((obj) => {
      const objectData = obj.toObject();

      const fb = new fabric.Canvas(null);
      fb.setZoom(1);
      fb.viewportTransform![4] = obj.width! / 2;
      fb.viewportTransform![5] = obj.height! / 2;

      fb.loadFromJSON(objectData, () => {
        const link = document.createElement("a");
        link.href = fb.toDataURL({
          format: "png",
        });
        link.download = `${objectData.name}.png`;
        link.click();
      });
    });
  };
</script>

<Sheet.Content side="right" class="flex flex-col h-full gap-6">
  <Sheet.Header>
    <Sheet.Title>Member list</Sheet.Title>
    <Sheet.Description>
      Export all of the cards as individual images.
    </Sheet.Description>
  </Sheet.Header>
  <ScrollArea class="h-full w-full">
    {#each $members as member}
      <Card.Root class="mb-2 max-w-60 md:max-w-full">
        <Card.Header class="p-4">
          <Card.Title>{member.login}</Card.Title>
          <Card.Description class="truncate">{member.url}</Card.Description>
        </Card.Header>
      </Card.Root>
    {/each}
  </ScrollArea>
  <Sheet.Footer>
    <Sheet.Close asChild let:builder>
      <Button builders={[builder]} type="button" on:click={save}>Export</Button>
    </Sheet.Close>
  </Sheet.Footer>
</Sheet.Content>
