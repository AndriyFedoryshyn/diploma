import { HTMLProps, ReactNode, type FC } from "react";

interface SpanPropsI extends HTMLProps<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
  onMouseEnter?: (event: React.MouseEvent) => void;
}

export const Span: FC<SpanPropsI> = ({ className, children, onMouseEnter }) => {
  return (
    <span onMouseEnter={onMouseEnter} className={className}>
      {children}
    </span>
  );
};
