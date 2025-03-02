import { HTMLProps } from 'react';
import { AreasT, AreaT } from '../types/AreasType';
import { SearchTermT } from '../types/HeaderType';

export interface HeaderProps {
  onSearch: (searchTerm: SearchTermT) => void;
  settlements: AreasT;
}

export interface HeaderFormProps {
  onSearch: (searchTerm: SearchTermT) => void;
  settlements: AreaT[];
}

export interface HeaderLocationProps extends HTMLProps<HTMLElement> {
  handleMouseEnter?: (event: React.MouseEvent) => void;
  handleImageMouseEnter?: (event: React.MouseEvent) => void;
  handleFocus: (event: React.FocusEvent<HTMLHeadingElement>) => void;
}
