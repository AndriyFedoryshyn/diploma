import { RefObject } from 'react';

export interface BurgerHeaderPropsI {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  handleCloseBurgerMenu: () => void;
  handleFocus: (
    event: React.FocusEvent<HTMLElement | HTMLDivElement | HTMLImageElement>
  ) => void;
}
