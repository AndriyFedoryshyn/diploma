import {
  LabelsT,
  ColorLabelI,
  ClassNamesT,
} from '@/shared/types/UIControlsType';

import styles from '@/features/components/modules/Controls/UIControls.module.scss';

export const labels: LabelsT = [
  { label: 'A', title: 'Зменшити шрифт до малого' },
  { label: 'A', title: 'Збільшити шрифт до середнього' },
  { label: 'A', title: 'Збільшити шрифт до великого' },
];

export const colorsLabels: ColorLabelI[] = [
  { label: 'A', title: 'Увімкнути сіру тему', theme: 'grayscale' },
  { label: 'A', title: 'Увімкнути темну тему', theme: 'dark' },
];

export const uiControlsClassNames: ClassNamesT = {
  block: styles['controlsFontSizeBlock'],
  heading: styles['controlsFontSizeHeading'],
  buttonsBlock: styles['controlsButtonsBlock'],
  button: styles['controlsButton'],
  activeButton: styles['active'],
};
