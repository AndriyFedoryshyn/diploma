import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { Div, Heading, Paragraph, Span } from '@/index';

import FlashOffIcon from '@mui/icons-material/FlashOff';

import styles from './GroupScheduleInfo.module.scss';

export const GroupScheduleStatistic: FC = () => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  return (
    <Div className={styles['groupScheduleStatistic']}>
      <Div className={styles['groupScheduleStatisticContainer']}>
        <Heading
          onFocus={handleFocus}
          level="h5"
          tabIndex={0}
          className={styles['groupScheduleStatisticHeading']}
        >
          Позначення до графіка
        </Heading>
        <Paragraph
          onFocus={handleFocus}
          tabIndex={0}
          className={styles['groupScheduleStatisticParagraph']}
        >
          На графіку відповідним фоном зафарбовані певні ділянки, що означає:
        </Paragraph>
        <Div className={styles['groupScheduleStatisticInfo']}>
          <Span
            onFocus={handleFocus}
            tabIndex={0}
            className={styles['groupScheduleStatisticInfoOn']}
          >
            Електроенергія присутня
          </Span>
          <Span
            onFocus={handleFocus}
            tabIndex={0}
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
