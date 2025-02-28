'use client';

import { type FC } from 'react';
import Link from 'next/link';

import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';

import { Button, Span } from '@/index';

import { ButtonChartT } from '@/shared/types/ButtonsChartType';
import { ChartListPropsI } from '@/shared/interfaces/ChartList';

export const FOCUS_COLOR: string = '#007bff';

export const ChartList: FC<ChartListPropsI> = ({ classNames, list }) => {
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    group: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      speakText(`Перехід до групи ${group}`);
      window.location.href = `/group/${group}`;
    }
  };

  return (
    <ul className={classNames.list} role="list">
      {list.map((listItem: ButtonChartT) => (
        <li key={listItem.id} className={classNames.listItem} role="listitem">
          <Link href={`/group/${listItem.numberOfGroup}`} passHref>
            <Button
              role="button"
              title={`Група ${listItem.numberOfGroup}`}
              aria-labelledby={`group-${listItem.numberOfGroup}`}
              className={classNames.button}
              onKeyDown={(event) => handleKeyDown(event, listItem.group)}
              onMouseEnter={handleMouseEnter}
              tabIndex={0}
            >
              <Span
                id={`group-${listItem.numberOfGroup}`}
                className={classNames.numberOfGroup}
              >
                {listItem.group}
              </Span>
              <Span className={classNames.numberOfGroup} aria-hidden="true">
                {listItem.numberOfGroup}
              </Span>
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
