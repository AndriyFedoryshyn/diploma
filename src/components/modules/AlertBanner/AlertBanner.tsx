'use client';

import { useRef, useEffect, type FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { Div } from '@/index';

import { AlertRefT } from '@/types/AlertBannerType';

import styles from './AlertBanner.module.scss';

export const AlertBanner: FC = () => {
  const alertRef = useRef<AlertRefT>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isSpeechEnabled) return;

    const target = event.target as HTMLElement;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (target.tagName === 'A') {
        (target as HTMLAnchorElement).click();
      }
    }

    if (event.key === 'Escape') {
      alertRef.current?.blur();
    }
  };

  useEffect(() => {
    alertRef.current?.focus();
  }, []);

  return (
    <Div
      className={styles['alertBanner']}
      ref={alertRef}
      role="alert"
      tabIndex={0}
      aria-live="assertive"
      aria-labelledby="alertHeading"
      aria-describedby="alertDescription"
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
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
        onFocus={handleFocus}
      />

      <h2
        id="alertHeading"
        className={styles['alertBannerHeading']}
        onKeyDown={handleKeyDown}
      >
        УВАГА! Через ракетну атаку і пошкодження об&apos;єктів інфраструктури в
        області застосовано аварійні та превентивні відключення. Актуальну
        інформацію можна{' '}
        <Link
          target="_blank"
          href="https://t.me/+3KmvmkL0g39hYTgy"
          className={styles['alertBannerMoreLink']}
          ref={linkRef}
          aria-label="Дізнатися актуальну інформацію тут"
        >
          дізнатися ТУТ
        </Link>
        .
      </h2>
    </Div>
  );
};
