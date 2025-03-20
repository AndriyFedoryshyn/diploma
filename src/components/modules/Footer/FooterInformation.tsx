import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { List, Div, FooterSocial } from '@/index';

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
      <h4
        id="footer-information-list"
        tabIndex={0}
        onFocus={handleFocus}
        className={styles['footerInformationHeading']}
      >
        Інформація та підтримка
      </h4>

      <List
        renderList={informationList}
        classNames={informationListClassNames}
        renderItem={(listItem) => {
          return (
            <span
              key={listItem.id}
              className={styles['footerInformationListItem']}
              tabIndex={0}
              role="listitem"
              aria-label={listItem.title}
              onFocus={handleFocus}
            >
              {listItem.title}
            </span>
          );
        }}
      />

      <FooterSocial />
    </Div>
  );
};
