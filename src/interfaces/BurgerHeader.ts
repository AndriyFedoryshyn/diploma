import { RefObject } from 'react';

export interface BurgerHeaderPropsI {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  handleCloseBurgerMenu: () => void;
  handleMouseEnterTitle: (event: React.MouseEvent) => void;
  handleFocus: (
    event: React.FocusEvent<HTMLElement | HTMLDivElement | HTMLImageElement>
  ) => void;
  handleMouseEnter: (event: React.MouseEvent) => void;
}
