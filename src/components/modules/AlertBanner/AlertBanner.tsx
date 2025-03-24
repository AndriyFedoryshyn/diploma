'use client';

import { useRef, type FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { Div } from '@/index';

import { AlertRefT } from '@/types/AlertBannerType';

import styles from './AlertBanner.module.scss';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';

export const AlertBanner: FC = () => {
  const alertRef = useRef<AlertRefT>(null);

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const { speakText } = useSpeechSynthesis();

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const onFocusImage = (event: React.FocusEvent<HTMLImageElement>) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLImageElement).alt.trim();
      speakText(text);
    }
  };

  return (
    <Div
      className={styles['alertBanner']}
      ref={alertRef}
      role="alert"
      tabIndex={0}
      aria-live="assertive"
      aria-labelledby="alertHeading"
      aria-describedby="alertDescription"
    >
      <Image
        className={styles['alertBannerIcon']}
        src={'/icons/alert_icon.svg'}
        alt="Іконка знаку оклику"
        priority
        aria-hidden="true"
        width={8}
        height={32}
        tabIndex={0}
        onFocus={onFocusImage}
      />
      <h2
        id="alertHeading"
        tabIndex={0}
        onFocus={handleFocus}
        className={styles['alertBannerHeading']}
      >
        УВАГА! Через ракетну атаку і пошкодження об&apos;єктів інфраструктури в
        області застосовано аварійні та превентивні відключення. Актуальну
        інформацію можна
        <Link
          target="_blank"
          tabIndex={-1}
          href="https://t.me/+3KmvmkL0g39hYTgy"
          className={styles['alertBannerMoreLink']}
          aria-label="Дізнатися актуальну інформацію тут"
        >
          дізнатися ТУТ.
        </Link>
      </h2>
    </Div>
  );
};
