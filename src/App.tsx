import { useState, useEffect } from "react";
import { fabric } from "fabric";
import { Canvas, Image as FabricImageType } from "fabric/fabric-impl";

import { useCanvasContextProvider } from "./context/CanvasContext";
import { useOnceEffect } from "./hooks/useEffectOnce";

import { tileMap, keyDirections } from "./constants";

const App = () => {
  const { canvas, setCanvas, cartToIso } = useCanvasContextProvider();

  const [player, setPlayer] = useState({} as FabricImageType);
  const [update, setUpdate] = useState(0);
  const [heldDirections, setHeldDirections] = useState<string[]>([]);

  useOnceEffect(() => {
    initCanvas();
    startGameLoop();
  });

  useEffect(() => {
    if (Object.keys(player).length !== 0) {
      document.addEventListener("keydown", handleDirectionInputKeyDown);
      document.addEventListener("keyup", handleDirectionInputKeyUp);
    }
  }, [player]);

  useEffect(() => {
    if (heldDirections.length) {
      handlePlayerMove(heldDirections);
    }
  }, [update]);

  const startGameLoop = () => {
    const step = () => {
      setUpdate(new Date().getTime());
      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  };

  const initCanvas = () => {
    const canvasWidth = tileMap.levelData[0].length * tileMap.tileWidth;
    const canvasHeight =
      (tileMap.levelData.length * tileMap.tileHeight) / 2 +
      tileMap.tileHeight / 2;

    const newCanvas = new fabric.Canvas("c", {
      selection: false,
      width: canvasWidth,
      height: canvasHeight,
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
    img.setAttribute("crossOrigin", "anonymous");

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    for (let i = 0; i < mapRowLength; i++) {
      for (let j = 0; j < mapColLength; j++) {
        cartX = i * tileMap.tileWidth;
        cartY = j * tileMap.tileHeight;

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

    drawPlayer(currentCanvas, startX);
  };

  const drawPlayer = async (currentCanvas: Canvas, startX: number) => {
    const img = new Image();
    img.setAttribute("src", "src/assets/player.png");
    img.setAttribute("crossOrigin", "anonymous");

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const x = 1;
    const y = 3;

    const playerObject = new fabric.Image(img, {
      left: cartToIso({ x: x * 32, y: y * 32 }).x + startX,
      top: cartToIso({ x: x * 32, y: y * 32 }).y - 22,
      selectable: false,
      hoverCursor: "default",
      type: "player",
    });

    currentCanvas.add(playerObject);
    setPlayer(playerObject);
  };

  const handlePlayerMove = (directionArray: string[]) => {
    const joinedDirections = directionArray.join("-");

    let top = player.top as number;
    let left = player.left as number;

    switch (joinedDirections) {
      // NORTH
      case "up":
        top += -1;
        left += +2;
        break;

      // NORTH-EAST
      case "up-right":
        left += +2;
        break;
      case "right-up":
        left += +2;
        break;

      // EAST
      case "right":
        top += +1;
        left += +2;
        break;

      // SOUTH-EAST
      case "down-right":
        top += +2;
        break;
      case "right-down":
        top += +2;
        break;

      // SOUTH
      case "down":
        top += +1;
        left += -2;
        break;

      // SOUTH-WEST
      case "down-left":
        left += -2;
        break;
      case "left-down":
        left += -2;
        break;

      // WEST
      case "left":
        top += -1;
        left += -2;
        break;

      // NORTH-WEST
      case "up-left":
        top += -2;
        break;
      case "left-up":
        top += -2;
        break;

      default:
        break;
    }

    player.set({ top, left }).setCoords();
    canvas.renderAll();
  };

  const handleDirectionInputKeyDown = (e: KeyboardEvent) => {
    const dir = keyDirections[e.code as keyof typeof keyDirections];

    if (dir && heldDirections.indexOf(dir) === -1) {
      heldDirections.unshift(dir);
    }
  };

  const handleDirectionInputKeyUp = (e: KeyboardEvent) => {
    const dir = keyDirections[e.code as keyof typeof keyDirections];

    const index = heldDirections.indexOf(dir);
    if (index > -1) {
      heldDirections.splice(index, 1);
    }
  };

  return (
    <div className="game-container" onMouseOver={() => console.log("canvas")}>
      <canvas className="game-canvas" id="c" />
    </div>
  );
};

export default App;
