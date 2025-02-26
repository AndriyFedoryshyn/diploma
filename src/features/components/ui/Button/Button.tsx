import { FC, HTMLProps, ReactNode } from "react";

interface ButtonPropsI extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  className: string;
  title?: string;
  onClick?: () => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  ariaLabel?: string;
}

export const Button: FC<ButtonPropsI> = ({
  className,
  onClick,
  onMouseEnter,
  title,
  children,
  ariaLabel,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      title={title}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};
