import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { Div, Paragraph } from '@/index';

import FlashOffIcon from '@mui/icons-material/FlashOff';

import styles from './GroupScheduleInfo.module.scss';

export const GroupScheduleStatistic: FC = () => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  return (
    <Div className={styles['groupScheduleStatistic']}>
      <Div className={styles['groupScheduleStatisticContainer']}>
        <h5
          tabIndex={0}
          onFocus={handleFocus}
          className={styles['groupScheduleStatisticHeading']}
        >
          Позначення до графіка
        </h5>
        <Paragraph
          onFocus={handleFocus}
          tabIndex={0}
          className={styles['groupScheduleStatisticParagraph']}
        >
          На графіку відповідним фоном зафарбовані певні ділянки, що означає:
        </Paragraph>
        <Div className={styles['groupScheduleStatisticInfo']}>
          <span
            onFocus={handleFocus}
            tabIndex={0}
            className={styles['groupScheduleStatisticInfoOn']}
          >
            Електроенергія присутня
          </span>
          <span
            onFocus={handleFocus}
            tabIndex={0}
            className={styles['groupScheduleStatisticInfoOff']}
          >
            <FlashOffIcon />
            Електроенергія відсутня
          </span>
        </Div>
      </Div>
    </Div>
  );
};
