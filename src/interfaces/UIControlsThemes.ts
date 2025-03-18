import { ClassNamesT, ColorsI } from '../types/UIControlsType';

export interface UIControlsThemesPropsI {
  colorsLabels: ColorsI;
  handleFocus: (event: React.FocusEvent<HTMLElement>) => void;
  classNames: ClassNamesT;
}
