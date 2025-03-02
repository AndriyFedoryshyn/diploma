'use client';

import { FC, useMemo } from 'react';

import Image from 'next/image';

import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useRouter } from 'next/navigation';

import { PATHS } from '@/enums/paths';

import { Div } from '@/index';

import styles from './Header.module.scss';

export const HeaderLogo: FC = () => {
  const router = useRouter();

  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleImageFocus = (event: React.FocusEvent<HTMLImageElement>) => {
    if (isSpeechEnabled) {
      const altText = (event.target as HTMLImageElement).alt.trim();
      speakText(altText);
    }
  };

  const handleImageMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const altText = (event.target as HTMLImageElement).alt.trim();
      speakText(altText);
    }
  };

  const handleGoHomePage = useMemo(() => {
    return () => router.push(PATHS.HOME);
  }, [router]);

  return (
    <Div
      className={styles['headerLogo']}
      role="img"
      aria-label="Логотип компанії Energy-UA"
      data-role="Header Logo"
      tabIndex={0}
      onClick={handleGoHomePage}
      onFocus={handleFocus}
      onBlur={(e) => e.currentTarget.classList.remove(styles.focused)}
    >
      <Image
        className={styles['headerLogoIcon']}
        src="/icons/energy_logo.svg"
        alt="Логотип компанії Energy-UA"
        width={55}
        height={55}
        onMouseEnter={handleImageMouseEnter}
        onFocus={handleImageFocus}
        tabIndex={0}
      />
      <Div className={styles['headerLogoHeadings']}>
        <h4
          className={styles['headerLogoHeading']}
          onMouseEnter={handleMouseEnter}
          onFocus={handleFocus}
          tabIndex={0}
        >
          Energy-UA
        </h4>
        <h5
          className={styles['headerLogoSubheading']}
          onMouseEnter={handleMouseEnter}
          onFocus={handleFocus}
          tabIndex={0}
        >
          Графіки відключень
        </h5>
      </Div>
    </Div>
  );
};
