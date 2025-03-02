import { ColorLabelI } from '../types/UIControlsType';

export interface UIThemeControlsPropsT {
  labels: ColorLabelI[];
  isActive: boolean;
  classNames: {
    block: string;
    button: string;
  };
}
