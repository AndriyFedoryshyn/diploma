import { type FC } from 'react';

import { Div, Heading, UIControlsButtons } from '@/index';

import { ClassNamesT, LabelsT } from '@/shared/types/UIControlsType';

interface UIControlsFontSizePropsI {
  handleMouseEnter: (event: React.MouseEvent) => void;
  handleFontSizeSelect: (index: number) => void;
  fontSize: string;
  labels: LabelsT;
  classNames: ClassNamesT;
}

export const UIControlsFontSize: FC<UIControlsFontSizePropsI> = ({
  handleMouseEnter,
  handleFontSizeSelect,
  fontSize,
  labels,
  classNames,
}) => {
  return (
    <Div className={classNames.block}>
      <Heading
        id="uiControlsHeading"
        tabIndex={0}
        onMouseEnter={handleMouseEnter}
        level="h4"
        className={classNames.heading}
      >
        Розмір шрифту:
      </Heading>

      <UIControlsButtons
        classNames={{
          block: classNames.buttonsBlock,
          button: classNames.button,
        }}
        labels={labels}
        onButtonSelect={handleFontSizeSelect}
        selectedIndex={['small', 'medium', 'large'].indexOf(fontSize)}
        isActive={true}
      />
    </Div>
  );
};
