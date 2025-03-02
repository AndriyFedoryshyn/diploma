'use client';

import { usePathname } from 'next/navigation';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';

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
  const { speakText } = useSpeechSynthesis();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleSpeakText = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

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
          onMouseEnter={handleSpeakText}
          level="h3"
          className={styles['groupLightHeading']}
        >
          Відключення завтра
        </Heading>
        <GroupPeriodsBanner />
      </Div>
    </Section>
  );
};

export default Group;
