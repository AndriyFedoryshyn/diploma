import { type FC, useCallback } from 'react';

import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';

import { UIControlsButtonsPropsT } from '@/interfaces/UIControlsButtons';

import { Button, Div } from '@/index';

export const UIControlsButtons: FC<UIControlsButtonsPropsT> = ({
  onButtonSelect,
  labels,
  isActive,
  selectedIndex,
  classNames,
}) => {
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleMouseEnterTitle = useCallback(
    (event: React.MouseEvent) => {
      if (isSpeechEnabled) {
        const text = (event.target as HTMLElement)
          .getAttribute('title')
          ?.trim();
        if (text) {
          speakText(text);
        }
      }
    },
    [isSpeechEnabled, speakText]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onButtonSelect(index);
      }
    },
    [onButtonSelect]
  );

  return (
    <Div className={classNames.block}>
      {labels.map((label, index) => (
        <Button
          key={index}
          aria-label={label.title}
          aria-pressed={selectedIndex === index}
          title={label.title}
          role="button"
          className={`${classNames.button} ${
            selectedIndex === index ? classNames.active : ''
          }`}
          tabIndex={isActive ? 0 : -1}
          onClick={() => onButtonSelect(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onMouseEnter={handleMouseEnterTitle}
        >
          {label.label}
        </Button>
      ))}
    </Div>
  );
};
