import { type FC } from "react";

import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

import Link from "next/link";

import FavoriteIcon from "@mui/icons-material/Favorite";

import { Button, Div, Heading, GroupPeriodsBanner } from "@/index";

import styles from "./GroupScheduleInfo.module.scss";

export const GroupScheduleInfoPeriods: FC = () => {
  const { speakText } = useSpeechSynthesis();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleSpeakText = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  return (
    <Div className={styles["groupPeriods"]}>
      <Div className={styles["groupPeriodsContainer"]}>
        <Heading
          onMouseEnter={handleSpeakText}
          level='h4'
          className={styles["groupPeriodsHeading"]}
        >
          Періоди відключень на сьогодні
        </Heading>
        <GroupPeriodsBanner />
        <Button
          role='button'
          type='button'
          className={styles["groupPeriodsButton"]}
        >
          <FavoriteIcon fontSize='medium' />
          <Link
            href={"https://send.monobank.ua/jar/2tEdkCbQaT"}
            target={"_blank"}
            className={styles["groupPeriodsLink"]}
            onMouseEnter={handleSpeakText}
          >
            Допомогти проекту
          </Link>
        </Button>
      </Div>
    </Div>
  );
};
