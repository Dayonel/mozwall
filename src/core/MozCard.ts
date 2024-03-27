import { fabric } from 'fabric';

export const MozCard = fabric.util.createClass(fabric.Group, {
  type: 'mozCard',
  // initialize can be of type function(options) or function(property, options), like for text.
  // no other signatures allowed.
  initialize: function (options: any) {
    options || (options = {});

    this.set('name', options.name || '');
    this.set('avatar', options.avatar || '');
    this.set('url', options.url || '');
    this.set('width', options.width || 200);
    this.set('height', options.height || 250);

    this.subTargetCheck = true;
    this.opacity = 0;

    let items: fabric.Object[] = [];

    // card
    const card = new fabric.Rect({
      width: options.width,
      height: options.height,
      fill: 'black',
      stroke: '#27272a',
      strokeWidth: 0.5,
      rx: 8,
      ry: 8,
      originX: 'center',
      originY: 'center',
    });

    items = [...items, card];

    // name
    const name = new fabric.Text(options.name, {
      top: 0,
      fontSize: 20,
      fill: '#fafafa',
      fontFamily: 'Geist',
      fontWeight: 'bold',
    });
    name.left = -name.width! / 2; // center
    items = [...items, name];

    // url
    const url = new fabric.Text(options.url, {
      top: 100,
      fontSize: 8,
      fill: '#a1a1aa',
      fontFamily: 'Geist',
      hoverCursor: "pointer"
    });
    url.left = -url.width! / 2; // center
    url.on('mousedown', (e) => this.openUrl(e));
    url.on('mouseover', () => {
      url.set('underline', true);
      this.canvas.renderAll();
    });
    url.on('mouseout', () => {
      url.set('underline', false);
      this.canvas.renderAll();
    });
    items = [...items, url];

    // github icon
    fabric.loadSVGFromURL("./github.svg", (objects, options) => {
      objects.forEach((f) => {
        f.set('stroke', '#fafafa');
      });

      const obj = fabric.util.groupSVGElements(objects, options);
      const scale = 1;
      obj.scale(scale);
      obj.top = options.height + 45;
      obj.left = -obj.width! * scale / 2; // center
      obj.hoverCursor = "pointer";
      this.add(obj);
    });

    // avatar
    const radius = 150;
    const scale = 0.25;
    const circle = new fabric.Circle({
      top: -90,
      radius: radius,
      fill: 'transparent',
      scaleX: scale,
      scaleY: scale,
    });
    circle.left = -radius / 4; // center

    fabric.util.loadImage(options.avatar, (img) => {
      circle.set('fill', new fabric.Pattern({
        source: img,
        repeat: 'no-repeat',
        patternTransform: [1, 0, 0, 1, -img.width! / 2 + radius, -img.height! / 2 + radius]
      }));

      this.canvas.renderAll();
    });

    items = [...items, circle];

    this.callSuper('initialize', items, options);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      name: this.get('name'),
      avatar: this.get('avatar'),
      url: this.get('url'),
    });
  },

  _render: function (ctx: any) {
    this.callSuper('_render', ctx);
  },

  openUrl: function (e: fabric.IEvent) {
    e.e.preventDefault();
    e.e.stopPropagation();
    this.canvas.discardActiveObject();
    window.open(this.get('url'), '_blank');
  }
});
