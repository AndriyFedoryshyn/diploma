"use client";

import { type FC } from "react";

import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";

import { Button, Span } from "@/index";

import { ButtonChartT, ButtonsChartT } from "@/shared/types/ButtonsChartType";
import Link from "next/link";

interface ChartListPropsI {
  classNames: {
    list: string;
    listItem: string;
    button: string;
    numberOfGroup: string;
  };
  list: ButtonsChartT;
}

export const FOCUS_COLOR: string = "#007bff";

export const ChartList: FC<ChartListPropsI> = ({ classNames, list }) => {
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(`Група номер ${text}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, group: string) => {
    if (event.key === "Enter" || event.key === "") {
      event.preventDefault();
      alert(`Navigating to group: ${group}`);
    }
  };

  return (
    <ul className={classNames.list} role='list'>
      {list.map((listItem: ButtonChartT) => (
        <li key={listItem.id} className={classNames.listItem} role='listitem'>
          <Link href={`/group/${listItem.numberOfGroup}`} passHref>
            <Button
              title={`Група ${listItem.numberOfGroup}`}
              aria-label={`Перейти до графіка групи ${listItem.group}`}
              className={classNames.button}
              onKeyDown={(event) => handleKeyDown(event, listItem.group)}
              onBlur={(e) =>
                (e.currentTarget.style.outline = "2px solid transparent")
              }
              onFocus={(e) =>
                (e.currentTarget.style.outline = `2px solid ${FOCUS_COLOR}`)
              }
              onMouseEnter={handleMouseEnter}
              tabIndex={0}
            >
              {listItem.group}{" "}
              <Span className={classNames.numberOfGroup} aria-hidden='true'>
                {listItem.numberOfGroup}
              </Span>{" "}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
