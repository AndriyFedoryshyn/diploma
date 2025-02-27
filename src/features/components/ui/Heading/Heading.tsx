import { FC, HTMLProps, JSX, ReactNode } from 'react';

interface HeadingPropsI extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className: string;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const Heading: FC<HeadingPropsI> = ({
  onMouseEnter,
  onKeyDown,
  children,
  level,
  className,
}) => {
  const HeadingElement = level as keyof JSX.IntrinsicElements;

  return (
    <HeadingElement
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      className={className}
    >
      {children}
    </HeadingElement>
  );
};
