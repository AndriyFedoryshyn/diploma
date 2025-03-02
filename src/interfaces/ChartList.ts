import { ButtonsChartT } from '../types/ButtonsChartType';

export interface ChartListPropsI {
  classNames: {
    list: string;
    listItem: string;
    button: string;
    numberOfGroup: string;
  };
  list: ButtonsChartT;
}
