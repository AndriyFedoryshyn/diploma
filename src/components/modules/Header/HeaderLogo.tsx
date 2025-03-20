'use client';

import { FC, useMemo } from 'react';

import Image from 'next/image';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useRouter } from 'next/navigation';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { PATHS } from '@/enums/paths';

import { Div } from '@/index';

import styles from './Header.module.scss';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';

export const HeaderLogo: FC = () => {
  const router = useRouter();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const { speakText } = useSpeechSynthesis();

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const handleFocusImageSpeech = (
    event: React.FocusEvent<HTMLImageElement>
  ) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLImageElement).alt.trim();
      speakText(text);
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
      onBlur={(e) => e.currentTarget.classList.remove(styles.focused)}
    >
      <Image
        className={styles['headerLogoIcon']}
        src="/icons/energy_logo.svg"
        alt="Логотип компанії Energy-UA"
        width={55}
        height={55}
        onFocus={handleFocusImageSpeech}
        tabIndex={0}
      />
      <Div className={styles['headerLogoHeadings']}>
        <h4
          className={styles['headerLogoHeading']}
          onFocus={handleFocus}
          tabIndex={0}
        >
          Energy-UA
        </h4>
        <h5
          className={styles['headerLogoSubheading']}
          onFocus={handleFocus}
          tabIndex={0}
        >
          Графіки відключень
        </h5>
      </Div>
    </Div>
  );
};
