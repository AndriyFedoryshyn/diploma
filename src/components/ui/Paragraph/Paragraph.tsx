import { HTMLProps, ReactNode, type FC } from 'react';

interface ParagraphPropsI extends HTMLProps<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
  onMouseEnter?: (event: React.MouseEvent) => void;
}

export const Paragpraph: FC<ParagraphPropsI> = ({
  className,
  children,
  onMouseEnter,
}) => {
  return (
    <p onMouseEnter={onMouseEnter} className={className}>
      {children}
    </p>
  );
};
