'use client';

import React, { ChangeEvent, useState, type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';

import { NoResultsT, SearchT } from '@/types/HeaderType';
import { AreaT } from '@/types/AreasType';

import { List, Span, Div, Form } from '@/index';

import { HeaderFormProps } from '@/interfaces/Header';

import styles from './Header.module.scss';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

const filteredSuggestionsClassNames = {
  list: styles['suggestionsDropdown'],
  listItem: styles['suggestionsItem'],
};

export const HeaderForm: FC<HeaderFormProps> = ({ onSearch, settlements }) => {
  const [search, setSearch] = useState<SearchT>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<AreaT[]>([]);
  const [noResults, setNoResults] = useState<NoResultsT>(false);

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const handleSubmitForm = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);

    if (query.trim() === '') {
      setFilteredSuggestions([]);
      setNoResults(false);
      onSearch(query);
      return;
    }

    const filtered = settlements.filter((settlement) =>
      settlement.name.uk.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setNoResults(filtered.length === 0);
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSubmitForm} className={styles['headerForm']}>
      <label
        htmlFor="searchInput"
        className={styles['headerFormSerachLabel']}
        tabIndex={0}
        onFocus={handleFocus}
      >
        Введіть населений пункт для пошуку
      </label>
      <input
        id="searchInput"
        className={styles['headerFormSearch']}
        value={search}
        onChange={handleSearchChange}
        type="text"
        onFocus={handleFocus}
        placeholder="Населений пункт"
        aria-label="Населений пункт для пошуку"
        aria-required="true"
        tabIndex={0}
      />

      {filteredSuggestions.length > 0 && (
        <List
          renderList={filteredSuggestions}
          renderItem={(suggestion) => {
            return (
              <Span
                onClick={() => {
                  setSearch(suggestion.name.uk);
                  onSearch(suggestion.name.uk);
                  setFilteredSuggestions([]);
                  setNoResults(false);
                }}
                key={suggestion.id}
              >
                {suggestion.name.uk}
              </Span>
            );
          }}
          classNames={filteredSuggestionsClassNames}
        />
      )}

      {noResults && (
        <Div className={styles['noResultsMessage']}>Нічого не знайдено</Div>
      )}
    </Form>
  );
};
