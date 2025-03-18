import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { List, Div, Heading, Span, FooterSocial } from '@/index';

import { informationList } from '@/static/informationList';

import styles from './Footer.module.scss';

const informationListClassNames = {
  list: styles['footerInformationList'],
  listItem: styles['footerInformationListItem'],
};

export const FooterInformation: FC = () => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  return (
    <Div className={styles['footerInformation']}>
      <Heading
        id="footer-information-list"
        onFocus={handleFocus}
        tabIndex={0}
        level="h4"
        className={styles['footerInformationHeading']}
      >
        Інформація та підтримка
      </Heading>

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
              onFocus={handleFocus}
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
