<script lang="ts">
  import { onMount } from "svelte";
  import MozCanvas from "../core/MozCanvas";
  import { moz } from "../store";
  import { toast } from "svelte-sonner";
  import FontFaceObserver from "fontfaceobserver";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    // preload fonts
    var font = new FontFaceObserver("Handjet");
    font.load().then(
      () => {
        console.log("Font has loaded.");
        $moz = new MozCanvas(canvas, {
          width: window.innerWidth,
          height: window.innerHeight,
        });
      },
      () => {
        toast.error("Font is not available");
      },
    );
  });

  const resize = () => {
    $moz.setWidth(window.innerWidth);
    $moz.setHeight(window.innerHeight);
    $moz.getObjects("splash").forEach((f) => {
      if (window.innerHeight < 400) {
        f.visible = false;
      } else {
        f.visible = true;
        $moz.centerObjectH(f);
        if (f.name == "export") {
          f.top = $moz.getHeight() - f.height! * 1.5;
        }
      }
    });
  };
</script>

<svelte:window on:resize={resize} />

<canvas bind:this={canvas} id="canvas" width="300" height="300"></canvas>
