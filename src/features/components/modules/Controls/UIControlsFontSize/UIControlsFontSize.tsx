import { useMemo, type FC } from 'react';

import { Div, Heading, UIControlsButtons } from '@/index';

import { UIControlsFontSizePropsI } from '@/shared/interfaces/UIControlsFontSize';

export const UIControlsFontSize: FC<UIControlsFontSizePropsI> = ({
  handleMouseEnter,
  handleFontSizeSelect,
  fontSize,
  labels,
  classNames,
}) => {
  const classNamesControlsButtons = useMemo(() => {
    return {
      button: classNames.button,
      active: classNames.activeButton,
      block: classNames.buttonsBlock,
    };
  }, [classNames.button, classNames.activeButton, classNames.buttonsBlock]);

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
        classNames={classNamesControlsButtons}
        labels={labels}
        onButtonSelect={handleFontSizeSelect}
        selectedIndex={['small', 'medium', 'large'].indexOf(fontSize)}
        isActive={true}
      />
    </Div>
  );
};
