'use client';

import { useState, type FC } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { Section, Div, Heading, Button, List, Span } from '@/index';

import { alphabet } from '@/static/alphabet';

import { SelectedLetterT } from '@/types/SettlementsList';

import { SettlementsListPropsI } from '@/interfaces/SettlementsList';

import styles from './SettlementsList.module.scss';

export const SettlementsList: FC<SettlementsListPropsI> = ({
  searchQuery,
  data,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<SelectedLetterT>('А');
  const [showAll, setShowAll] = useState(false);

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const handleShowAllAreas = () => {
    setShowAll(true);
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

  const displayedData = showAll ? filteredData : filteredData.slice(0, 80);

  return (
    <Section className={styles['settlementsList']}>
      <Div className={styles['settlementsListContainer']}>
        <Div className={styles['settlementsListInfo']}>
          <Heading
            level="h2"
            id="settlements-list"
            className={styles['settlementsListHeading']}
            onFocus={handleFocus}
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
                onFocus={handleFocus}
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
          renderList={displayedData}
          renderItem={(area) => (
            <Button
              tabIndex={0}
              key={area.id}
              onFocus={handleFocus}
              className={styles['settlementsListAreasItemFocus']}
            >
              {area.name.uk}
            </Button>
          )}
        />

        {filteredData.length > 80 && !showAll && (
          <Button
            tabIndex={0}
            className={styles['showAllButton']}
            onClick={handleShowAllAreas}
            onFocus={handleFocus}
          >
            Показати все
          </Button>
        )}
      </Div>
    </Section>
  );
};
