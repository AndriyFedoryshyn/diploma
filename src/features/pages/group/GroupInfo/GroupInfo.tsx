import { type FC } from 'react';

import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';

import { AlertBanner, Button, Heading, Paragpraph, Section } from '@/index';

import Link from 'next/link';

import TelegramIcon from '@mui/icons-material/Telegram';

import { GroupInfoProps } from '@/shared/interfaces/Group';

import styles from '@/shared/styles/pages/Group.module.scss';

export const GroupInfo: FC<GroupInfoProps> = ({ firstPart, secondPart }) => {
  const { speakText } = useSpeechSynthesis();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleSpeakText = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  return (
    <Section className={styles['groupInfo']}>
      <Heading
        onMouseEnter={handleSpeakText}
        level="h1"
        className={styles['groupMainHeading']}
      >
        Графік відключень електроенергії у Львівській області (сьогодні):{' '}
        {firstPart} група ({secondPart} підгрупа)
      </Heading>
      <Button role="button" type="button" className={styles['groupMainButton']}>
        <TelegramIcon fontSize="large" />
        <Link
          onMouseEnter={handleSpeakText}
          target={'_blank'}
          href={'https://t.me/+3KmvmkL0g39hYTgy'}
          className={styles['alertBannerMoreLink']}
          tabIndex={0}
          aria-label="Дізнатися актуальну інформацію тут"
        >
          Підключити сповіщення
        </Link>
      </Button>
      <Paragpraph
        onMouseEnter={handleSpeakText}
        className={styles['groupMainParagraph']}
      >
        У вас
        <strong>
          {' '}
          {firstPart} група ({secondPart} підгрупа)
        </strong>{' '}
        - після підключення сповіщень орієнтуйтесь на неї!
      </Paragpraph>
      <AlertBanner />
    </Section>
  );
};
