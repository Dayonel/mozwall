import { fabric } from "fabric";
import type { ICanvasOptions } from "fabric/fabric-impl";
import { mode } from "mode-watcher";

class MozCanvas extends fabric.Canvas {
  private isDragging = false;
  private lastPosX = 0;
  private lastPosY = 0;
  private wheelSensitivity = 0.5;
  private isPanning = false;

  constructor(element: HTMLCanvasElement | string | null, options?: ICanvasOptions) {
    super(element, options);
    this.zoom();
    this.pan();
    this.disableResize();
    this.fireMiddleClick = true;
    this.addSplash();
    mode.subscribe((value) => this.setSplashColor(value)); // dark mode
  }

  zoom() {
    this.on('mouse:wheel', (opt) => {
      const objects = this.getObjects().filter(f => f.type !== 'splash');
      if (objects.length === 0) return;

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

        const objects = this.getObjects().filter(f => f.type !== 'splash');
        if (objects.length === 0) return;

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
    if (isPanning) {
      this.clear();
    }
  }

  disableResize = () => {
    // Disable resizing the page when scrolling
    window.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
    }, { passive: false });
  };

  addSplash() {
    mode.subscribe((value) => {
      fabric.loadSVGFromURL("./members.svg", (objects, options) => {
        objects.forEach((f) => {
          this.setSplashFillColor(f, value);
        });

        const obj = fabric.util.groupSVGElements(objects, options);
        obj.type = "splash";
        obj.name = "members";
        obj.selectable = false;
        obj.evented = false;
        obj.top = 80;
        this.centerObjectH(obj);
        this.add(obj);
        this.renderAll();
      });

      fabric.loadSVGFromURL("./export.svg", (objects, options) => {
        objects.forEach((f) => {
          this.setSplashFillColor(f, value);
        })

        const obj = fabric.util.groupSVGElements(objects, options);
        obj.type = "splash";
        obj.name = "export";
        obj.selectable = false;
        obj.evented = false;
        obj.top = 80;
        obj.top = this.getHeight() - obj.height! * 1.5;
        this.centerObjectH(obj);
        this.add(obj);
        this.renderAll();
      });
    });
  }

  setSplashColor(value: string | undefined) {
    const groups = this.getObjects("splash").reduce((acc, f) => {
      acc.push(f as fabric.Group);
      return acc;
    }, [] as fabric.Group[]);

    groups.forEach((f) => {
      f?.getObjects().forEach((f) => {
        this.setSplashFillColor(f, value);
      });
    });

    this.renderAll();
  };

  setSplashFillColor(obj: fabric.Object, value: string | undefined) {
    obj.set("fill", value === "dark" ? "#71717a" : "#b8b8b8");
  }
}

export default MozCanvas;