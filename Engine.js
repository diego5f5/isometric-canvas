class Engine {
  constructor(config, map) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.level = {
      tileMap: map.tileMap,
      tileWidth: map.tileWidth,
      tileHeight: map.tileHeight,
    };
  }

  cartToIso({ x, y }) {
    const isoX = (x - y) / 2;
    const isoY = (x + y) / 4;

    return { x: isoX, y: isoY };
  }

  isoToCart({ x, y }) {
    const cartX = (2 * y + x) / 2;
    const cartY = (2 * y - x) / 2;

    return { x: cartX, y: cartY };
  }

  drawMap() {
    let cartX;
    let cartY;
    const tileImage = new Image();

    tileImage.src = "images/block.png";
    tileImage.onload = () => {
      const mapRowLength = this.level.tileMap[0].length;
      const mapColLength = this.level.tileMap.length;
      const startX =
        (mapRowLength * this.level.tileWidth) / 2 - this.level.tileWidth / 2;

      for (let i = 0; i < mapRowLength; i++) {
        for (let j = 0; j < mapColLength; j++) {
          setTimeout(() => {
            cartX = i * this.level.tileWidth;
            cartY = j * this.level.tileHeight;

            this.ctx.drawImage(
              tileImage,
              this.cartToIso({ x: cartX, y: cartY }).x + startX,
              this.cartToIso({ x: cartX, y: cartY }).y
            );
          }, (i + j) * 50);
        }
      }
    };

    this.canvas.addEventListener("click", (e) => {
      console.log(e);
    });
  }

  init() {
    this.drawMap();
  }
}
