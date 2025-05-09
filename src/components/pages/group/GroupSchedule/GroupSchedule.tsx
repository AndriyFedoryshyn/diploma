'use client';

import { type FC, useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { Div, List, Section } from '@/index';

import { PastIndices, VisibleIndicators } from '@/types/GroupScheduleType';

import { scheduleHours } from '@/static/schedule';

import styles from '@/styles/pages/Group.module.scss';

export const GroupSchedule: FC = () => {
  const [visibleIndicators, setVisibleIndicators] = useState<VisibleIndicators>(
    [0]
  );
  const [pastIndices, setPastIndices] = useState<PastIndices>([]);

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const getCurrentIndex = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let index = -1;

    scheduleHours.forEach((item, i) => {
      const startHour = parseInt(item.hours[0].split(':')[0], 10);
      const endHour = parseInt(item.hours[1].split(':')[0], 10);

      if (currentHour >= startHour && currentHour < endHour) {
        index = i;
      }
    });

    return index;
  };

  const getPastIndices = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const pastIndices: number[] = [];

    scheduleHours.forEach((item, i) => {
      const endHour = parseInt(item.hours[1].split(':')[0], 10);
      if (currentHour >= endHour) {
        pastIndices.push(i);
      }
    });

    return pastIndices;
  };

  useEffect(() => {
    let index = getCurrentIndex();
    setVisibleIndicators([index]);

    setPastIndices(getPastIndices());

    const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      if (index < scheduleHours.length) {
        setVisibleIndicators([index]);
        index += 2;
      } else {
        clearInterval(interval);
      }
    }, twoHoursInMilliseconds);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section role="container" className={styles['schedule']}>
      <Div className={styles['scheduleContainer']}>
        <h2 className={styles['scheduleHeading']} tabIndex={0}>
          Відключення сьогодні
        </h2>
      </Div>
      <Div className={styles['scheduleHoursContainer']}>
        <List
          classNames={{
            list: styles['scheduleHoursList'],
            listItem: styles['scheduleHoursListItem'],
          }}
          renderItem={(item, index) => {
            const showIndicator = visibleIndicators.includes(index);
            const isPast = pastIndices.includes(index);

            return (
              <Div
                key={item.id}
                className={`${styles['scheduleItemHours']} ${
                  showIndicator ? styles['active'] : ''
                } ${isPast ? styles['past'] : ''}`}
              >
                <Div className={styles['scheduleItemTimes']}>
                  <em className={styles['scheduleItemHour']}>
                    {item.hours[0]}
                  </em>
                  <em className={styles['scheduleItemHour']}>
                    {item.hours[1]}
                  </em>
                </Div>
                <span
                  onFocus={handleFocus}
                  tabIndex={0}
                  className={styles['scheduleHoursBlock']}
                >
                  {showIndicator && (
                    <span className={styles['lightIndicator']}></span>
                  )}
                </span>
              </Div>
            );
          }}
          renderList={scheduleHours}
        />
      </Div>
    </Section>
  );
};
