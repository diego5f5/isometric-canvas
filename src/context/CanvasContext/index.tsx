import { createContext, useState, useContext, ReactNode } from "react";
import { fabric } from "fabric";

import { CanvasContexTypes, CoordsTypes } from "./models";
import { Canvas } from "fabric/fabric-impl";
export const CreateYourPostsContext = createContext({} as CanvasContexTypes);

const CanvasContextProvider = ({ children }: { children: ReactNode }) => {
  const [canvas, setCanvas] = useState<Canvas>({} as Canvas);

  const initCanvas = () => {
    const newCanvas = new fabric.Canvas("c", {
      height: 600,
      width: 800,
      backgroundColor: "gray",
      selection: false,
    });

    setCanvas(newCanvas);
  };

  const cartToIso = ({ x, y }: CoordsTypes) => {
    const isoX = (x - y) / 2;
    const isoY = (x + y) / 4;

    return { x: isoX, y: isoY };
  };

  const isoToCart = ({ x, y }: CoordsTypes) => {
    const cartX = (2 * y + x) / 2;
    const cartY = (2 * y - x) / 2;

    return { x: cartX, y: cartY };
  };

  return (
    <CreateYourPostsContext.Provider
      value={{
        initCanvas,
        canvas,
        setCanvas,
        cartToIso,
        isoToCart,
      }}
    >
      {children}
    </CreateYourPostsContext.Provider>
  );
};

const useCanvasContextProvider = () => {
  const context = useContext(CreateYourPostsContext);

  if (!context) {
    throw new Error(
      "useCanvasContextProvider must be used within an CanvasContextProvider."
    );
  }

  return context;
};

export { CanvasContextProvider, useCanvasContextProvider };
