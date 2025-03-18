'use client';

import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import {
  Div,
  GroupHeader,
  GroupInfo,
  GroupSchedule,
  GroupScheduleInfo,
  Heading,
  GroupPeriodsBanner,
  Section,
} from '@/index';

import styles from '@/styles/pages/Group.module.scss';

const Group = () => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);
  const pathname = usePathname();

  const slug = pathname!.split('/').pop();

  const firstPart = slug!.slice(0, 1);
  const secondPart = slug!.slice(2, 3);

  return (
    <Section className={styles['group']}>
      <Div className={styles['groupIntro']}>
        <Div className={styles['groupContainer']}>
          <GroupHeader />
          <GroupInfo firstPart={firstPart} secondPart={secondPart} />
        </Div>
      </Div>

      <GroupSchedule />
      <GroupScheduleInfo firstPart={firstPart} secondPart={secondPart} />

      <Div className={styles['groupLightInfo']}>
        <Heading
          onFocus={handleFocus}
          level="h3"
          className={styles['groupLightHeading']}
          tabIndex={0}
        >
          Відключення завтра
        </Heading>
        <GroupPeriodsBanner />
      </Div>
    </Section>
  );
};

export default Group;
