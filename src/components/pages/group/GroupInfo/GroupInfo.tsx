import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { AlertBanner, Button, Heading, Paragraph, Section } from '@/index';

import Link from 'next/link';

import TelegramIcon from '@mui/icons-material/Telegram';

import { GroupInfoProps } from '@/interfaces/Group';

import styles from '@/styles/pages/Group.module.scss';

export const GroupInfo: FC<GroupInfoProps> = ({ firstPart, secondPart }) => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  return (
    <Section className={styles['groupInfo']}>
      <Heading
        onFocus={handleFocus}
        level="h1"
        className={styles['groupMainHeading']}
        tabIndex={0}
      >
        Графік відключень електроенергії у Львівській області (сьогодні):{' '}
        {firstPart} група ({secondPart} підгрупа)
      </Heading>
      <Button role="button" type="button" className={styles['groupMainButton']}>
        <TelegramIcon fontSize="large" />
        <Link
          onFocus={handleFocus}
          target={'_blank'}
          href={'https://t.me/+3KmvmkL0g39hYTgy'}
          className={styles['alertBannerMoreLink']}
          tabIndex={0}
          aria-label="Дізнатися актуальну інформацію тут"
        >
          Підключити сповіщення
        </Link>
      </Button>
      <Paragraph
        onFocus={handleFocus}
        className={styles['groupMainParagraph']}
        tabIndex={0}
      >
        У вас
        <strong>
          {' '}
          {firstPart} група ({secondPart} підгрупа)
        </strong>{' '}
        - після підключення сповіщень орієнтуйтесь на неї!
      </Paragraph>
      <AlertBanner />
    </Section>
  );
};
