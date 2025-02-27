import { HTMLProps, ReactNode, type FC } from 'react';

interface DivPropsT extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onClick?: () => void;
  onFocus?: (event: React.FocusEvent) => void;
}

export const Div: FC<DivPropsT> = ({
  children,
  className,
  onKeyDown,
  onFocus,
  onClick,
}) => {
  return (
    <div
      onFocus={onFocus}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={className}
    >
      {children}
    </div>
  );
};
