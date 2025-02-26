import { HTMLProps, ReactNode, type FC } from "react";

interface HeaderPropsI extends HTMLProps<HTMLElement> {
  children: ReactNode;
  className: string;
}

export const Header: FC<HeaderPropsI> = ({ children, className }) => {
  return <header className={className}>{children}</header>;
};
