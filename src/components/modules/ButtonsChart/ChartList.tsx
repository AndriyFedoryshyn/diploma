'use client';

import { type FC } from 'react';

import Link from 'next/link';

import { useAppSelector } from '@/hooks/useAppSelector';

import { Button, Span } from '@/index';

import { ButtonChartT } from '@/types/ButtonsChartType';
import { ChartListPropsI } from '@/interfaces/ChartList';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

export const FOCUS_COLOR: string = '#007bff';

export const ChartList: FC<ChartListPropsI> = ({ classNames, list }) => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const { speakText } = useSpeechSynthesis();

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

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
              onFocus={handleFocus}
              tabIndex={0}
            >
              <Span
                id={`group-${listItem.numberOfGroup}`}
                className={classNames.numberOfGroup}
                onFocus={handleFocus}
              >
                {listItem.group}
              </Span>
              <Span
                className={classNames.numberOfGroup}
                onFocus={handleFocus}
                aria-hidden="true"
              >
                {listItem.numberOfGroup}
              </Span>
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
