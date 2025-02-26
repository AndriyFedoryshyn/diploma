import { type FC } from "react";

import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";

import { Div, Heading, ChartList } from "@/index";

import { chartButtons } from "@/shared/static/chartButtons";

import { FOCUS_COLOR } from "./ChartList";

import styles from "./ButtonsChart.module.scss";

const chartListClassNames = {
  list: styles["chartList"],
  listItem: styles["chartListItem"],
  button: styles["chartListItemButton"],
  numberOfGroup: styles["chartListItemNumberOfGroup"],
};

export const ButtonChart: FC = () => {
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  return (
    <Div className={styles["buttonsChartBlock"]}>
      <Heading
        onMouseEnter={handleMouseEnter}
        level='h2'
        className={styles["chartHeading"]}
        id='chartHeading'
        tabIndex={0}
        onBlur={(e) =>
          (e.currentTarget.style.outline = "2px solid transparent")
        }
        onFocus={(e) =>
          (e.currentTarget.style.outline = `2px solid ${FOCUS_COLOR}`)
        }
      >
        Перейти до графіка за чергою
      </Heading>

      <ChartList
        aria-labelledby='chartHeading'
        classNames={chartListClassNames}
        list={chartButtons}
      />
    </Div>
  );
};
