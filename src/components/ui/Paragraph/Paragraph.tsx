import { HTMLProps, ReactNode, type FC } from 'react';

interface ParagraphPropsI extends HTMLProps<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
  tabIndex?: number;
  onMouseEnter?: (event: React.MouseEvent) => void;
}

export const Paragraph: FC<ParagraphPropsI> = ({
  className,
  children,
  tabIndex,
  onMouseEnter,
}) => {
  return (
    <p tabIndex={tabIndex} onMouseEnter={onMouseEnter} className={className}>
      {children}
    </p>
  );
};
