import { type FC } from 'react';

import { Div, Paragraph } from '@/index';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';

import styles from '../GroupScheduleInfo/GroupScheduleInfo.module.scss';

export const GroupPeriodsBanner: FC = () => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  return (
    <Div className={styles['groupPeriodsInfo']}>
      <ContentPasteOffIcon fontSize="large" color="action" />
      <Paragraph
        onFocus={handleFocus}
        tabIndex={0}
        className={styles['groupPeriodsParagraph']}
      >
        Немає даних
      </Paragraph>
    </Div>
  );
};
