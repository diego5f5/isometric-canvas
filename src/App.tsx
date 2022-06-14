import { fabric } from "fabric";
import { useState } from "react";

import { useCanvasContextProvider } from "./context/CanvasContext";
import { useOnceEffect } from "./hooks/useEffectOnce";

const tileMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const App = () => {
  const { initCanvas, canvas, cartToIso } = useCanvasContextProvider();

  const [level, setLevel] = useState({
    tileMap: tileMap,
    tileWidth: 32,
    tileHeight: 32,
  });

  useOnceEffect(() => {
    initCanvas();
  });

  const drawMap = async () => {
    let cartX = 0;
    let cartY = 0;

    const mapRowLength = level.tileMap[0].length;
    const mapColLength = level.tileMap.length;
    const startX = (mapRowLength * level.tileWidth) / 2 - level.tileWidth / 2;

    for (let i = 0; i < mapRowLength; i++) {
      for (let j = 0; j < mapColLength; j++) {
        cartX = i * level.tileWidth;
        cartY = j * level.tileHeight;
        fabric.Image.fromURL(
          "src/assets/block.png",
          (oImg) => {
            canvas?.add(oImg);
          },
          {
            left: cartToIso({ x: cartX, y: cartY }).x + startX,
            top: cartToIso({ x: cartX, y: cartY }).y,
          }
        );

        await new Promise((resolve) => setTimeout(resolve, 5));
      }
    }

    canvas?.on("mouse:over", (e) => {
      // @ts-ignore
      e.target.set({
        // @ts-ignore
        top: e.target?.top - 8,
      });
      canvas?.renderAll();
    });

    canvas?.on("mouse:out", (e) => {
      // @ts-ignore
      e.target.set({
        // @ts-ignore
        top: e.target?.top + 8,
      });
      canvas?.renderAll();
    });
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
