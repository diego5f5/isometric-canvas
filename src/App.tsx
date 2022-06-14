import { fabric } from "fabric";

import { useCanvasContextProvider } from "./context/CanvasContext";
import { useOnceEffect } from "./hooks/useEffectOnce";

const tileMap = {
  mapWidth: 24,
  mapHeight: 24,
  tileWidth: 32,
  tileHeight: 32,
};

const App = () => {
  const { initCanvas, canvas, cartToIso } = useCanvasContextProvider();
  useOnceEffect(() => {
    initCanvas();
  });

  const drawMap = async () => {
    let cartX = 0;
    let cartY = 0;

    const mapRowLength = tileMap.mapWidth;
    const mapColLength = tileMap.mapHeight;
    const startX =
      (mapRowLength * tileMap.tileWidth) / 2 - tileMap.tileWidth / 2;

    const img = new Image();
    img.setAttribute("src", "src/assets/block.png");
    img.setAttribute("crossOrigin", "anonymous");

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    for (let i = 0; i < mapRowLength; i++) {
      for (let j = 0; j < mapColLength; j++) {
        cartX = i * tileMap.tileWidth;
        cartY = j * tileMap.tileHeight;

        canvas.add(
          new fabric.Image(img, {
            left: cartToIso({ x: cartX, y: cartY }).x + startX,
            top: cartToIso({ x: cartX, y: cartY }).y,
            selectable: false,
            hoverCursor: "default",
          })
        );
      }
    }
  };

  return (
    <div>
      <h1>Fabric Canvas</h1>
      <button onClick={() => drawMap()}>Draw Map</button>
      <canvas id="c" />
    </div>
  );
};

export default App;
