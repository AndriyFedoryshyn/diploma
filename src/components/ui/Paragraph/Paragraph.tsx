import { HTMLProps, ReactNode, type FC } from 'react';

interface ParagraphPropsI extends HTMLProps<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
  tabIndex?: number;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
}

export const Paragraph: FC<ParagraphPropsI> = ({
  className,
  children,
  tabIndex,
  onMouseEnter,
  onFocus,
}) => {
  return (
    <p
      tabIndex={tabIndex}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      className={className}
    >
      {children}
    </p>
  );
};
