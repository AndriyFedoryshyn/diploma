import { HTMLProps, ReactNode, type FC } from "react";

interface DivPropsT extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onClick?: () => void;
}

export const Div: FC<DivPropsT> = ({
  children,
  className,
  onKeyDown,
  onClick,
}) => {
  return (
    <div onClick={onClick} onKeyDown={onKeyDown} className={className}>
      {children}
    </div>
  );
};
