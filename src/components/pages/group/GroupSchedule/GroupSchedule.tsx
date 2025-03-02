'use client';

import { type FC, useEffect, useState } from 'react';

import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';

import { Div, List, Section, Span } from '@/index';

import { PastIndices, VisibleIndicators } from '@/types/GroupScheduleType';

import { scheduleHours } from '@/static/schedule';

import styles from '@/styles/pages/Group.module.scss';

export const GroupSchedule: FC = () => {
  const [visibleIndicators, setVisibleIndicators] = useState<VisibleIndicators>(
    [0]
  );
  const [pastIndices, setPastIndices] = useState<PastIndices>([]);

  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

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

  const handleSpeakText = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  return (
    <Section role="container" className={styles['schedule']}>
      <Div className={styles['scheduleContainer']}>
        <h2
          className={styles['scheduleHeading']}
          onMouseEnter={handleSpeakText}
        >
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
                <Span className={styles['scheduleHoursBlock']}>
                  {showIndicator && (
                    <span className={styles['lightIndicator']}></span>
                  )}
                </Span>
              </Div>
            );
          }}
          renderList={scheduleHours}
        />
      </Div>
    </Section>
  );
};
