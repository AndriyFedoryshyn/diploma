import { HTMLProps, ReactNode, type FC } from 'react';

interface NavPropsI extends HTMLProps<HTMLElement> {
  children: ReactNode;
  className: string;
}

export const Nav: FC<NavPropsI> = ({ className, children }) => {
  return <nav className={className}>{children}</nav>;
};
