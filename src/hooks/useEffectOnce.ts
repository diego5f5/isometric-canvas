import { useEffect } from "react";

const useDevEffect = (cb: () => void) => {
  let ran = false;
  // @ts-ignore
  useEffect(() => {
    if (ran) return;
    cb();
    return () => (ran = true);
  }, []);
};

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const useOnceEffect = isDev ? useDevEffect : useEffect;
