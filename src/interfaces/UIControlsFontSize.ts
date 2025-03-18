import { ClassNamesT, LabelsT } from '../types/UIControlsType';

export interface UIControlsFontSizePropsI {
  handleFocus: (event: React.FocusEvent<HTMLElement>) => void;
  handleFontSizeSelect: (index: number) => void;
  fontSize: string;
  labels: LabelsT;
  classNames: ClassNamesT;
}
