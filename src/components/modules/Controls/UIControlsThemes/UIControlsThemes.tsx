import { type FC } from 'react';

import { Div, Heading, UIThemeControls } from '@/index';

import { UIControlsThemesPropsI } from '@/interfaces/UIControlsThemes';

export const UIControlsThemes: FC<UIControlsThemesPropsI> = ({
  colorsLabels,
  handleFocus,
  classNames,
}) => {
  return (
    <Div className={classNames.block}>
      <Heading
        level="h4"
        tabIndex={0}
        className={classNames.heading}
        onFocus={handleFocus}
      >
        Колір сайту:
      </Heading>

      <UIThemeControls
        classNames={{
          block: classNames.buttonsBlock,
          button: classNames.button,
        }}
        isActive={true}
        labels={colorsLabels}
      />
    </Div>
  );
};
