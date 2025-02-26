import { HTMLProps, ReactNode, type FC } from "react";

interface SectionPropsI extends HTMLProps<HTMLElement> {
  children: ReactNode;
  className: string;
}

export const Section: FC<SectionPropsI> = ({ children, className }) => {
  return <section className={className}>{children}</section>;
};
