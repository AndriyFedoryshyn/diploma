import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { Div, Paragraph } from '@/index';

import { formateDate } from '@/utils/formateDate';

import { GroupScheduleInfoDatePropsI } from '@/interfaces/Group';

import styles from './GroupScheduleInfo.module.scss';

export const GroupScheduleInfoDate: FC<GroupScheduleInfoDatePropsI> = ({
  firstPart,
  secondPart,
}) => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  return (
    <Div className={styles['groupScheduleInfoDate']}>
      <Div className={styles['groupScheduleInfoDateContainer']}>
        <h5
          onFocus={handleFocus}
          tabIndex={0}
          className={styles['groupScheduleInfoDateHeading']}
        >
          {firstPart} група ({secondPart} підгрупа)
        </h5>
        <Paragraph
          onFocus={handleFocus}
          tabIndex={0}
          className={styles['groupScheduleInfoDateParagraph']}
        >
          {formateDate}
        </Paragraph>
      </Div>
    </Div>
  );
};
