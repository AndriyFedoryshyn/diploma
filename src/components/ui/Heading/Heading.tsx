import { FC, HTMLProps, JSX, ReactNode } from 'react';

interface HeadingPropsI extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className: string;
  tabIndex?: number;
  onFocus?: (event: React.FocusEvent<Element>) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const Heading: FC<HeadingPropsI> = ({
  onFocus,
  onMouseEnter,
  onKeyDown,
  children,
  level,
  className,
  tabIndex,
}) => {
  const HeadingElement = level as keyof JSX.IntrinsicElements;

  return (
    <HeadingElement
      tabIndex={tabIndex}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      className={className}
    >
      {children}
    </HeadingElement>
  );
};
