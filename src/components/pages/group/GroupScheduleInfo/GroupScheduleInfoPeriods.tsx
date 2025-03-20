import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import Link from 'next/link';

import FavoriteIcon from '@mui/icons-material/Favorite';

import { Button, Div, GroupPeriodsBanner } from '@/index';

import styles from './GroupScheduleInfo.module.scss';

export const GroupScheduleInfoPeriods: FC = () => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  return (
    <Div className={styles['groupPeriods']}>
      <Div className={styles['groupPeriodsContainer']}>
        <h4 className={styles['groupPeriodsHeading']} tabIndex={0}>
          Періоди відключень на сьогодні
        </h4>
        <GroupPeriodsBanner />
        <Button
          role="button"
          type="button"
          className={styles['groupPeriodsButton']}
        >
          <FavoriteIcon fontSize="medium" />
          <Link
            href={'https://send.monobank.ua/jar/2tEdkCbQaT'}
            target={'_blank'}
            className={styles['groupPeriodsLink']}
            onFocus={handleFocus}
            tabIndex={0}
          >
            Допомогти проекту
          </Link>
        </Button>
      </Div>
    </Div>
  );
};
