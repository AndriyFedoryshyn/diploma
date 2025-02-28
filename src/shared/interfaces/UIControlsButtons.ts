export interface LabelT {
  label: string;
  title: string;
}

export interface UIControlsButtonsPropsT {
  labels: LabelT[];
  isActive: boolean;
  onButtonSelect: (index: number) => void;
  selectedIndex: number;
  classNames: {
    block: string;
    button: string;
    active: string;
  };
}
