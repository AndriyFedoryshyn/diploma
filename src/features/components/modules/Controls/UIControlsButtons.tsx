import { type FC } from "react";

import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

import { Button, Div } from "@/index";

import styles from "./UIControls.module.scss";

interface LabelT {
  label: string;
  title: string;
}

interface UIControlsButtonsPropsT {
  labels: LabelT[];
  isActive: boolean;
  onButtonSelect: (index: number) => void;
  selectedIndex: number;
}

export const UIControlsButtons: FC<UIControlsButtonsPropsT> = ({
  labels,
  isActive,
  onButtonSelect,
  selectedIndex,
}) => {
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleMouseEnterTitle = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).getAttribute("title")?.trim();

      if (text) {
        speakText(text);
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === "") {
      event.preventDefault();
      onButtonSelect(index);
    }
  };

  return (
    <Div className={styles["controlsButtonsBlock"]}>
      {labels.map((label, index) => (
        <Button
          aria-label={label.title}
          aria-pressed={selectedIndex === index}
          title={label.title}
          key={index}
          role='button'
          className={`${styles["controlsButton"]} ${
            selectedIndex === index ? styles["active"] : ""
          }`}
          tabIndex={isActive ? 0 : -1}
          onClick={() => onButtonSelect(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onMouseEnter={handleMouseEnterTitle}
        >
          {label.label}
        </Button>
      ))}
    </Div>
  );
};
