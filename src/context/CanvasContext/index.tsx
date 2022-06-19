import { createContext, useState, useContext, ReactNode } from "react";
import { Canvas } from "fabric/fabric-impl";

import { CanvasContexTypes, CoordsTypes } from "./models";

export const CreateYourPostsContext = createContext({} as CanvasContexTypes);

const CanvasContextProvider = ({ children }: { children: ReactNode }) => {
  const [canvas, setCanvas] = useState<Canvas>({} as Canvas);

  const cartToIso = ({ x, y }: CoordsTypes) => {
    const isoX = (x - y) / 2;
    const isoY = (x + y) / 4;

    return { x: isoX, y: isoY };
  };

  return (
    <CreateYourPostsContext.Provider
      value={{
        canvas,
        setCanvas,
        cartToIso,
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
