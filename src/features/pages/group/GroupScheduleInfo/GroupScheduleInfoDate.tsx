import { type FC } from "react";

import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

import { Div, Heading, Paragpraph } from "@/index";

import { formatedDate } from "@/shared/utils/formateDate";

import styles from "./GroupScheduleInfo.module.scss";

interface GroupScheduleInfoDatePropsI {
  firstPart: string | undefined;
  secondPart: string | undefined;
}

export const GroupScheduleInfoDate: FC<GroupScheduleInfoDatePropsI> = ({
  firstPart,
  secondPart,
}) => {
  const { speakText } = useSpeechSynthesis();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleSpeakText = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  return (
    <Div className={styles["groupScheduleInfoDate"]}>
      <Div className={styles["groupScheduleInfoDateContainer"]}>
        <Heading
          onMouseEnter={handleSpeakText}
          level='h5'
          className={styles["groupScheduleInfoDateHeading"]}
        >
          {firstPart} група ({secondPart} підгрупа)
        </Heading>
        <Paragpraph
          onMouseEnter={handleSpeakText}
          className={styles["groupScheduleInfoDateParagraph"]}
        >
          {formatedDate}
        </Paragpraph>
      </Div>
    </Div>
  );
};
