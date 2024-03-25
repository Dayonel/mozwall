<script lang="ts">
  import { onMount } from "svelte";
  import MozCanvas from "../core/MozCanvas";
  import { moz } from "../store";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    $moz = new MozCanvas(canvas, {
      width: window.innerWidth,
      height: window.innerHeight,
    });
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
