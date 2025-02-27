export interface LabelI {
  label: string;
  title: string;
}

export interface ColorLabelI {
  label: string;
  title: string;
  theme: 'light' | 'dark' | 'grayscale';
}

export type LabelsT = LabelI[];
export type ColorsI = ColorLabelI[];

export type ClassNamesT = {
  block: string;
  heading: string;
  buttonsBlock: string;
  button: string;
};
