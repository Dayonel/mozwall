<script lang="ts">
  import { fabric } from "fabric";
  import { onMount } from "svelte";
  import MozCanvas from "../core/MozCanvas";

  let canvas: HTMLCanvasElement;
  let fb: fabric.Canvas;
  onMount(() => {
    fb = new MozCanvas(canvas, {
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
    fb.add(rect);
  });

  const resize = () => {
    fb.setWidth(window.innerWidth);
    fb.setHeight(window.innerHeight);
  };
</script>

<svelte:window on:resize={resize} />

<canvas bind:this={canvas} id="canvas" width="300" height="300"></canvas>
