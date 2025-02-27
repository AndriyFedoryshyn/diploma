import { type FC } from 'react';

import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { List, Div, Heading, Span, FooterSocial } from '@/index';

import { informationList } from '@/shared/static/informationList';

import styles from './Footer.module.scss';

const informationListClassNames = {
  list: styles['footerInformationList'],
  listItem: styles['footerInformationListItem'],
};

export const FooterInformation: FC = () => {
  const { speakText } = useSpeechSynthesis();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  return (
    <Div className={styles['footerInformation']}>
      <Heading
        id="footer-information-list"
        onMouseEnter={handleMouseEnter}
        level="h4"
        className={styles['footerInformationHeading']}
      >
        Інформація та підтримка
      </Heading>

      <ul className={styles['footerInformationList']} role="list">
        {informationList.map((listItem) => (
          <li
            key={listItem.id}
            className={styles['footerInformationListItem']}
            tabIndex={0}
            role="listitem"
            aria-label={listItem.title}
            onMouseEnter={handleMouseEnter}
          >
            {listItem.title}
          </li>
        ))}
      </ul>

      <List
        renderList={informationList}
        classNames={informationListClassNames}
        renderItem={(listItem) => {
          return (
            <Span
              key={listItem.id}
              className={styles['footerInformationListItem']}
              tabIndex={0}
              role="listitem"
              aria-label={listItem.title}
              onMouseEnter={handleMouseEnter}
            >
              {listItem.title}
            </Span>
          );
        }}
      />

      <FooterSocial />
    </Div>
  );
};
