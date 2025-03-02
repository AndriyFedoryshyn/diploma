import { HTMLProps, ReactNode, type FC } from 'react';

interface DivPropsT extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className: string;
  onClick?: () => void;
  onFocus?: (
    event: React.FocusEvent<HTMLElement | HTMLDivElement | HTMLImageElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLElement | HTMLDivElement | HTMLImageElement>
  ) => void;
  tabIndex?: number;
}

export const Div: FC<DivPropsT> = ({
  children,
  className,
  tabIndex,
  onKeyDown,
  onFocus,
  onClick,
}) => {
  return (
    <div
      tabIndex={tabIndex}
      onFocus={onFocus}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={className}
    >
      {children}
    </div>
  );
};
