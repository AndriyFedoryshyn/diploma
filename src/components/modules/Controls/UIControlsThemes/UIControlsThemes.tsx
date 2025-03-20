import { type FC } from 'react';

import { Div, UIThemeControls } from '@/index';

import { UIControlsThemesPropsI } from '@/interfaces/UIControlsThemes';

export const UIControlsThemes: FC<UIControlsThemesPropsI> = ({
  colorsLabels,
  handleFocus,
  classNames,
}) => {
  return (
    <Div className={classNames.block}>
      <h4 onFocus={handleFocus} tabIndex={0} className={classNames.heading}>
        Колір сайту:
      </h4>

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
