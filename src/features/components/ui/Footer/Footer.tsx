import { HTMLProps, ReactNode, type FC } from "react";

interface FooterI extends HTMLProps<HTMLElement> {
  children: ReactNode;
  className: string;
}

export const Footer: FC<FooterI> = ({ className, children }) => {
  return <footer className={className}>{children}</footer>;
};
