export const getIntervalPosition = (
  index: number,
  interval: number,
  cardWidth: number,
  cardHeight: number,
  canvasWidth: number,
  canvasHeight: number,
) => {
  const paddingTop = 100;
  const blocks = Math.floor(canvasWidth / (cardWidth + interval));
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  const offsetX = centerX / blocks / 2;
  const offsetY = centerY / 2 - cardHeight + paddingTop;

  const row = Math.floor(
    index / Math.floor(canvasWidth / (cardWidth + interval)),
  );
  const col = index % Math.floor(canvasWidth / (cardWidth + interval));
  const x = col * (cardWidth + interval) + offsetX;
  const y = row * (cardHeight + interval) + offsetY;
  return { x, y };
};