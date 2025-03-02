import { type FC } from 'react';

import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';

import { Div, Heading, Paragpraph, Span } from '@/index';

import FlashOffIcon from '@mui/icons-material/FlashOff';

import styles from './GroupScheduleInfo.module.scss';

export const GroupScheduleStatistic: FC = () => {
  const { speakText } = useSpeechSynthesis();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleSpeakText = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  return (
    <Div className={styles['groupScheduleStatistic']}>
      <Div className={styles['groupScheduleStatisticContainer']}>
        <Heading
          onMouseEnter={handleSpeakText}
          level="h5"
          className={styles['groupScheduleStatisticHeading']}
        >
          Позначення до графіка
        </Heading>
        <Paragpraph
          onMouseEnter={handleSpeakText}
          className={styles['groupScheduleStatisticParagraph']}
        >
          На графіку відповідним фоном зафарбовані певні ділянки, що означає:
        </Paragpraph>
        <Div className={styles['groupScheduleStatisticInfo']}>
          <Span
            onMouseEnter={handleSpeakText}
            className={styles['groupScheduleStatisticInfoOn']}
          >
            Електроенергія присутня
          </Span>
          <Span
            onMouseEnter={handleSpeakText}
            className={styles['groupScheduleStatisticInfoOff']}
          >
            <FlashOffIcon />
            Електроенергія відсутня
          </Span>
        </Div>
      </Div>
    </Div>
  );
};
