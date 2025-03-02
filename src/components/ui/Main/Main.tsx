import { FC, ReactNode } from 'react';

type MainPropsT = {
  children: ReactNode;
  className?: string;
};

export const Main: FC<MainPropsT> = ({ children, className }) => {
  return <main className={className}>{children}</main>;
};
