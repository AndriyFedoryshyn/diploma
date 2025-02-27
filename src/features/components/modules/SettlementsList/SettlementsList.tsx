'use client';

import { useState, type FC } from 'react';
import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';

import { Section, Div, Heading, Button, List, Span } from '@/index';

import { alphabet } from '@/shared/static/alphabet';

import { AreasT } from '@/shared/types/AreasType';

import { SelectedLetterT } from '@/shared/types/SettlementsList';

import { useAppSelector } from '@/shared/hooks/useAppSelector';

import styles from './SettlementsList.module.scss';

interface SettlementsListPropsI {
  searchQuery: string;
  data: AreasT;
}

export const SettlementsList: FC<SettlementsListPropsI> = ({
  searchQuery,
  data,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<SelectedLetterT>('А');

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const { speakText } = useSpeechSynthesis();

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(`Буква ${text}`);
    }
  };

  const handleMousePointEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const filteredData = data
    ? data
        .filter((area) => {
          const matchesLetter = area.name?.uk
            ?.toLowerCase()
            .startsWith(selectedLetter.toLowerCase());
          const matchesSearch = area.name?.uk
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
          return matchesLetter && matchesSearch;
        })
        .sort((a, b) => a.name.uk.localeCompare(b.name.uk))
    : [];

  return (
    <Section className={styles['settlementsList']}>
      <Div className={styles['settlementsListContainer']}>
        <Div className={styles['settlementsListInfo']}>
          <Heading
            level="h2"
            id="settlements-list"
            className={styles['settlementsListHeading']}
            onMouseEnter={handleMousePointEnter}
          >
            Перелік населених пунктів
          </Heading>
          <Div
            className={styles['settlementsListAlphabet']}
            role="region"
            aria-labelledby="alphabet-filter"
          >
            {alphabet.map((letter) => (
              <Button
                role="button"
                key={letter.id}
                className={styles['settlementsListAlphabetButton']}
                onClick={() => setSelectedLetter(letter.letter)}
                aria-pressed={selectedLetter === letter.letter}
                aria-label={`Фільтрувати за літерою ${letter.letter}`}
                onMouseEnter={handleMouseEnter}
              >
                {letter.letter}
              </Button>
            ))}
          </Div>
        </Div>

        <Span
          id="settlements-list"
          className={styles['settlementsListAlphabetLetter']}
          aria-live="polite"
          tabIndex={0}
          onFocus={handleFocus}
        >
          {selectedLetter}
        </Span>

        <List
          role="list"
          aria-labelledby="settlements-list"
          classNames={{
            list: styles['settlementsListAreas'],
            listItem: styles['settlementsListAreasItem'],
          }}
          renderList={filteredData}
          renderItem={(area) => (
            <Button
              tabIndex={0}
              key={area.id}
              onMouseEnter={handleMousePointEnter}
              onFocus={handleFocus}
              className={styles['settlementsListAreasItemFocus']}
            >
              {area.name.uk}
            </Button>
          )}
        />
      </Div>
    </Section>
  );
};
