import { type FC } from 'react';

import { Div, Heading, UIThemeControls } from '@/index';

import { ClassNamesT, ColorsI } from '@/shared/types/UIControlsType';

interface UIControlsThemesPropsI {
  colorsLabels: ColorsI;
  handleMouseEnter: (event: React.MouseEvent) => void;
  speakText: (text: string) => void;
  classNames: ClassNamesT;
}

export const UIControlsThemes: FC<UIControlsThemesPropsI> = ({
  colorsLabels,
  classNames,
  handleMouseEnter,
  speakText,
}) => {
  return (
    <Div className={classNames.block}>
      <Heading
        level="h4"
        tabIndex={0}
        className={classNames.heading}
        onMouseEnter={handleMouseEnter}
        onFocus={(event) => speakText(event.currentTarget.innerText)}
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
