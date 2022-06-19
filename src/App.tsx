import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";

import { useCanvasContextProvider } from "./context/CanvasContext";
import { useOnceEffect } from "./hooks/useEffectOnce";

import { tileMap } from "./constants";

const App = () => {
  const { setCanvas, cartToIso } = useCanvasContextProvider();

  useOnceEffect(() => {
    initCanvas();
  });

  const initCanvas = () => {
    const canvasWidth = tileMap.levelData[0].length * tileMap.tileWidth;
    const canvasHeight =
      (tileMap.levelData.length * tileMap.tileHeight) / 2 +
      tileMap.tileHeight / 2;

    const newCanvas = new fabric.Canvas("c", {
      selection: false,
      width: canvasWidth,
      height: canvasHeight,
      enableRetinaScaling: false,
    });

    setCanvas(newCanvas);
    drawMap(newCanvas);
  };

  const drawMap = async (currentCanvas: Canvas) => {
    let cartX = 0;
    let cartY = 0;

    const mapRowLength = tileMap.levelData[0].length;
    const mapColLength = tileMap.levelData.length;
    const startX =
      (mapRowLength * tileMap.tileWidth) / 2 - tileMap.tileWidth / 2;

    const img = new Image();
    img.setAttribute("src", "src/assets/block.png");

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    for (let i = 0; i < mapRowLength; i++) {
      for (let j = 0; j < mapColLength; j++) {
        cartX = i * tileMap.tileWidth;
        cartY = j * tileMap.tileHeight;

        if (tileMap.levelData[i][j] !== 0) {
          currentCanvas.add(
            new fabric.Image(img, {
              left: cartToIso({ x: cartX, y: cartY }).x + startX,
              top: cartToIso({ x: cartX, y: cartY }).y,
              selectable: false,
              hoverCursor: "default",
            })
          );
        }
      }
    }
  };

  return (
    <div className="c-container">
      <canvas id="c" />
    </div>
  );
};

export default App;
