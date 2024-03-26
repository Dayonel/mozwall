import { fabric } from 'fabric';

export const MozCard = fabric.util.createClass(fabric.Rect, {
  type: 'mozCard',
  // initialize can be of type function(options) or function(property, options), like for text.
  // no other signatures allowed.
  initialize: function (options: any) {
    options || (options = {});

    this.callSuper('initialize', options);
    this.set('name', options.name || '');
    this.set('avatar', options.avatar || '');
    this.set('url', options.url || '');

    this.set({ width: 200, height: 250 });
    this.set({ strokeWidth: 0.5, stroke: '#27272a' });
    this.set({ fill: 'black' });

    fabric.util.loadImage(options.avatar, (img) => {
      this.imageLoaded = true;
      this.image = img;
    });
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

    // name
    ctx.font = 'bold 16px Geist';
    ctx.fillStyle = '#fafafa';
    var nameWidth = ctx.measureText(this.name).width;
    ctx.fillText(this.name, -nameWidth / 2, -this.height / 2 + 110);

    // url
    ctx.font = '10px Geist';
    ctx.fillStyle = '#a1a1aa';
    var urlWidth = ctx.measureText(this.url).width;
    ctx.fillText(this.url, -urlWidth / 2, this.height / 2 - 50);

    // avatar
    if (this.imageLoaded) {
      this.drawImage(ctx);
    }
  },

  drawImage(ctx: any) {
    const radius = 30;

    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(this.image, -radius, -radius, 2 * radius, 2 * radius);
    ctx.restore();
  },
});
