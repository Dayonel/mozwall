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
      originY: 'center'
    });

    items = [...items, card];

    // name
    const name = new fabric.Text(options.name, {
      top: 10,
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
    });
    url.left = -url.width! / 2; // center
    items = [...items, url];

    // avatar
    const radius = 50;
    const circle = new fabric.Circle({
      top: -100,
      left: -50,
      radius: radius,
      fill: 'transparent',
    });

    fabric.util.loadImage(options.avatar, (img) => {
      circle.set('fill', new fabric.Pattern({
        source: img,
        repeat: 'no-repeat',
        patternTransform: [0.5, 0, 0, 0.5, -radius / 2, -radius / 2]
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
});
