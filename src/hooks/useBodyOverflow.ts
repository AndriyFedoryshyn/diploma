import { useEffect } from "react";

type IsOverflow = boolean;

export const useBodyOverflow = (isOverflow: IsOverflow) => {
  useEffect(() => {
    if (isOverflow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverflow]);
};
