'use client';

import { type FC, useCallback } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { ukraineRegions } from '@/static/regions';

import { List, Div, Button, FooterInformation, FooterElement } from '@/index';

import styles from './Footer.module.scss';

const regionsClassNames = {
  list: styles['regionsList'],
  listItem: styles['regionsListItem'],
};

export const Footer: FC = () => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, regionName: string) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        alert(`Navigating to region: ${regionName}`);
      }
    },
    []
  );

  return (
    <FooterElement className={styles['footer']}>
      <Div className={styles['footerContainer']}>
        <Div className={styles['footerRegionsList']}>
          <h3
            className={styles['regionsListHeading']}
            tabIndex={0}
            onFocus={handleFocus}
          >
            Інші області
          </h3>
          <List
            renderList={ukraineRegions}
            classNames={regionsClassNames}
            renderItem={(region) => (
              <Button
                key={region.name}
                tabIndex={0}
                role="button"
                className={styles['regionsListButton']}
                aria-label={`Перейти до області ${region.name}`}
                onKeyDown={(event) => handleKeyDown(event, region.name)}
                onFocus={handleFocus}
              >
                {region.name}
              </Button>
            )}
          />
        </Div>
        <FooterInformation />
      </Div>
    </FooterElement>
  );
};
