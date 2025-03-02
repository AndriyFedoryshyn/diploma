import { ClassNamesT, LabelsT } from '../types/UIControlsType';

export interface UIControlsFontSizePropsI {
  handleMouseEnter: (event: React.MouseEvent) => void;
  handleFontSizeSelect: (index: number) => void;
  fontSize: string;
  labels: LabelsT;
  classNames: ClassNamesT;
}
