import { Canvas } from "fabric/fabric-impl";

export type CanvasContexTypes = {
  canvas: Canvas;
  setCanvas: (value: Canvas) => void;
  cartToIso: (value: CoordsTypes) => CoordsTypes;
  isoToCart: (value: CoordsTypes) => CoordsTypes;
};

export type CoordsTypes = {
  x: number;
  y: number;
};
