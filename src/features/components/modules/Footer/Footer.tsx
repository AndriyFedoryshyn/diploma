'use client';

import { type FC, useCallback } from 'react';

import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { ukraineRegions } from '@/shared/static/regions';

import { List, Div, Button, Heading, FooterInformation } from '@/index';
import { Footer as FooterElement } from '../../ui/Footer/Footer';

import styles from './Footer.module.scss';

const regionsClassNames = {
  list: styles['regionsList'],
  listItem: styles['regionsListItem'],
};

export const Footer: FC = () => {
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleSpeak = useCallback(
    (text: string) => {
      if (isSpeechEnabled) speakText(text);
    },
    [isSpeechEnabled, speakText]
  );

  const handleMouseEnterRegion = useCallback(
    (event: React.MouseEvent) => {
      if (isSpeechEnabled) {
        const text = (event.target as HTMLElement).innerText.trim();
        speakText(text === 'Київ' ? text : `${text} область`);
      }
    },
    [isSpeechEnabled, speakText]
  );

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
          <Heading
            level="h3"
            className={styles['regionsListHeading']}
            onFocus={(e) => handleSpeak(e.currentTarget.innerText)}
          >
            Інші області
          </Heading>
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
                onMouseEnter={handleMouseEnterRegion}
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
