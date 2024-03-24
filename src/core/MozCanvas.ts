import { fabric } from "fabric";
import type { ICanvasOptions } from "fabric/fabric-impl";

class MozCanvas extends fabric.Canvas {
  private isDragging = false;
  private lastPosX = 0;
  private lastPosY = 0;
  private wheelSensitivity = 0.5;
  public isPanning = false;

  constructor(element: HTMLCanvasElement | string | null, options?: ICanvasOptions) {
    super(element, options);
    this.zoom();
    this.pan();
    this.disableResize();
    this.fireMiddleClick = true;
  }

  zoom() {
    this.on('mouse:wheel', (opt) => {
      var evt = opt.e;
      if (evt.ctrlKey === true) {
        // zoom
        var delta = opt.e.deltaY;
        var zoom = this.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        const point = new fabric.Point(opt.e.offsetX, opt.e.offsetY);
        this.zoomToPoint(point, zoom);
      }
      else {
        // pan
        var delta = -opt.e.deltaY;
        var panAmount = delta * this.wheelSensitivity;
        this.relativePan(new fabric.Point(0, panAmount));
      }

      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  pan() {
    this.on('mouse:down', (opt) => {
      var evt = opt.e;
      if (evt.button === 1 || this.isPanning) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });

    this.on('mouse:move', (opt) => {
      if (this.isDragging) {
        this.setCursor('grabbing');

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
      this.defaultCursor = this.isPanning ? 'grab' : 'default';
    });
  }

  setPanning(isPanning: boolean): void {
    this.isPanning = isPanning;
    this.defaultCursor = isPanning ? 'grab' : 'default';
  }

  disableResize = () => {
    // Disable resizing the page when scrolling
    window.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
    }, { passive: false });
  };
}

export default MozCanvas;