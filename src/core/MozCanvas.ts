import { fabric } from "fabric";
import type { ICanvasOptions } from "fabric/fabric-impl";

class MozCanvas extends fabric.Canvas {
  private isDragging = false;
  private lastPosX = 0;
  private lastPosY = 0;

  constructor(element: HTMLCanvasElement | string | null, options?: ICanvasOptions) {
    super(element, options);
    this.zoom();
    this.pan();
  }

  zoom() {
    this.on('mouse:wheel', (opt) => {
      var delta = opt.e.deltaY;
      var zoom = this.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      this.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  pan() {
    this.on('mouse:down', (opt) => {
      var evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    this.on('mouse:move', (opt) => {
      if (this.isDragging) {
        var e = opt.e;
        var vpt = this.viewportTransform!;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });

    this.on('mouse:up', () => {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      this.setViewportTransform(this.viewportTransform!);
      this.isDragging = false;
      this.selection = true;
    });
  }
}

export default MozCanvas;