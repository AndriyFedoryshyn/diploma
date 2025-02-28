import { ClassNamesT, ColorsI } from "../types/UIControlsType";

export interface UIControlsThemesPropsI {
  colorsLabels: ColorsI;
  handleMouseEnter: (event: React.MouseEvent) => void;
  speakText: (text: string) => void;
  classNames: ClassNamesT;
}
