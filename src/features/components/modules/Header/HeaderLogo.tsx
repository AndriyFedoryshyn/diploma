"use client";

import { FC } from "react";

import Image from "next/image";

import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useRouter } from "next/navigation";

import { PATHS } from "@/shared/enums/paths";

import { Heading, Div } from "@/index";

import styles from "./Header.module.scss";

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

  const handleImageMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const altText = (event.target as HTMLImageElement).alt.trim();
      speakText(altText);
    }
  };

  const handleGoHomePage = () => router.push(PATHS.HOME);
  return (
    <Div
      className={styles["headerLogo"]}
      role='img'
      aria-label='Логотип компанії Energy-UA'
      data-role='Header Logo'
      tabIndex={0}
      onClick={handleGoHomePage}
    >
      <Image
        className={styles["headerLogoIcon"]}
        src='/icons/energy_logo.svg'
        alt='Логотип компанії Energy-UA'
        width={55}
        height={55}
        onMouseEnter={handleImageMouseEnter}
      />
      <Div className={styles["headerLogoHeadings"]}>
        <Heading
          level='h4'
          className={styles["headerLogoHeading"]}
          onMouseEnter={handleMouseEnter}
        >
          Energy-UA
        </Heading>
        <Heading
          level='h5'
          className={styles["headerLogoSubheading"]}
          onMouseEnter={handleMouseEnter}
        >
          Графіки відключень
        </Heading>
      </Div>
    </Div>
  );
};
