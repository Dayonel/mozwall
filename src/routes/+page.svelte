<script lang="ts">
  import { fabric } from "fabric";
  import { onMount } from "svelte";
  import MozCanvas from "../core/MozCanvas";
  import { moz } from "../store";

  let canvas: HTMLCanvasElement;
  onMount(() => {
    $moz = new MozCanvas(canvas, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      width: 20,
      height: 15,
      fill: "blue",
    });
    $moz.add(rect);
  });

  const resize = () => {
    $moz.setWidth(window.innerWidth);
    $moz.setHeight(window.innerHeight);
  };
</script>

<svelte:window on:resize={resize} />

<canvas bind:this={canvas} id="canvas" width="300" height="300"></canvas>
