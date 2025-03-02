'use client';

import { useRef, useEffect, type FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';

import { Heading, Div } from '@/index';

import { AlertRefT } from '@/types/AlertBannerType';

import styles from './AlertBanner.module.scss';

export const AlertBanner: FC = () => {
  const alertRef = useRef<AlertRefT>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const { speakText } = useSpeechSynthesis();

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isSpeechEnabled) return;

    const target = event.target as HTMLElement;
    const text = target.innerText.trim();

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      speakText(text);
      if (target.tagName === 'A') {
        (target as HTMLAnchorElement).click();
      }
    }

    if (event.key === 'Escape') {
      alertRef.current?.blur();
    }
  };

  const handleImageMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const altText = (event.target as HTMLImageElement).alt.trim();
      speakText(altText);
    }
  };

  const handleFocus = (event: React.FocusEvent) => {
    if (isSpeechEnabled) {
      const altText = (event.target as HTMLElement).innerText.trim();
      speakText(altText);
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
        onMouseEnter={handleImageMouseEnter}
      />

      <Heading
        id="alertHeading"
        level="h2"
        className={styles['alertBannerHeading']}
        onMouseEnter={handleMouseEnter}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      >
        УВАГА! Через ракетну атаку і пошкодження об&apos;єктів інфраструктури в
        області застосовано аварійні та превентивні відключення. Актуальну
        інформацію можна{' '}
        <Link
          target="_blank"
          href="https://t.me/+3KmvmkL0g39hYTgy"
          className={styles['alertBannerMoreLink']}
          tabIndex={0}
          ref={linkRef}
          aria-label="Дізнатися актуальну інформацію тут"
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
        >
          дізнатися ТУТ
        </Link>
        .
      </Heading>
    </Div>
  );
};
