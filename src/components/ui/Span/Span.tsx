import { HTMLProps, ReactNode, type FC } from 'react';

interface SpanPropsI extends HTMLProps<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLElement | HTMLDivElement | HTMLImageElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLElement | HTMLDivElement | HTMLImageElement>
  ) => void;
}

export const Span: FC<SpanPropsI> = ({
  className,
  children,
  onMouseEnter,
  onFocus,
}) => {
  return (
    <span onMouseEnter={onMouseEnter} onFocus={onFocus} className={className}>
      {children}
    </span>
  );
};
