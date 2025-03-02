import { useEffect, useState } from "react";

type IsResize = boolean;
type PxValue = number;

export const useScreenResize = (pxValue: PxValue) => {
  const [isResize, setIsResize] = useState<IsResize>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsResize(window.innerWidth <= pxValue);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pxValue]);
  return { isResize };
};
