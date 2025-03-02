import { HTMLProps, ReactNode, type FC } from 'react';

interface FormPropsI extends HTMLProps<HTMLFormElement> {
  children: ReactNode;
  className?: string;
}

export const Form: FC<FormPropsI> = ({ children, className }) => {
  return <form className={className}>{children}</form>;
};
