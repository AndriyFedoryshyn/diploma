"use client";

import { type FC } from "react";

import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

import { ukraineRegions } from "@/shared/static/regions";

import { List, Div, Button, Heading, FooterInformation } from "@/index";
import { Footer as FooterElement } from "../../ui/Footer/Footer";

import styles from "./Footer.module.scss";

const regionsClassNames = {
  list: styles["regionsList"],
  listItem: styles["regionsListItem"],
};

export const Footer: FC = () => {
  const { speakText } = useSpeechSynthesis();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleSpeak = (text: string) => {
    if (isSpeechEnabled) speakText(text);
  };

  const handleMouseEnterRegion = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();

      if (text === "Київ") {
        speakText(text);
      } else {
        speakText(`${text}  область`);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, regionName: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      alert(`Navigating to region: ${regionName}`);
    }
  };

  return (
    <FooterElement className={styles["footer"]}>
      <Div className={styles["footerContainer"]}>
        <Div className={styles["footerRegionsList"]}>
          <Heading
            onFocus={(e) => handleSpeak(e.currentTarget.innerText)}
            onMouseEnter={handleMouseEnter}
            level='h3'
            className={styles["regionsListHeading"]}
          >
            Інші області
          </Heading>
          <List
            renderList={ukraineRegions}
            classNames={regionsClassNames}
            renderItem={(region) => {
              return (
                <Button
                  tabIndex={0}
                  role='button'
                  className={styles["regionsListButton"]}
                  aria-label={`Перейти до області ${region.name}`}
                  onKeyDown={(event) => handleKeyDown(event, region.name)}
                  onMouseEnter={handleMouseEnterRegion}
                >
                  {region.name}
                </Button>
              );
            }}
          />
        </Div>
        <FooterInformation />
      </Div>
    </FooterElement>
  );
};
