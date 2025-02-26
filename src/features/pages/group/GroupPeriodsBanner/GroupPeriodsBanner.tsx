import { type FC } from "react";

import { Div, Paragpraph } from "@/index";

import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

import ContentPasteOffIcon from "@mui/icons-material/ContentPasteOff";

import styles from "../GroupScheduleInfo/GroupScheduleInfo.module.scss";

export const GroupPeriodsBanner: FC = () => {
  const { speakText } = useSpeechSynthesis();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleSpeakText = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  return (
    <Div className={styles["groupPeriodsInfo"]}>
      <ContentPasteOffIcon fontSize='large' color='action' />
      <Paragpraph
        onMouseEnter={handleSpeakText}
        className={styles["groupPeriodsParagraph"]}
      >
        Немає даних
      </Paragpraph>
    </Div>
  );
};
