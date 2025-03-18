import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';

import Image from 'next/image';
import Link from 'next/link';

import { SocialItemT } from '@/types/FooterType';

import { List } from '@/index';

import { socialItems } from '@/static/socialItems';

import styles from './Footer.module.scss';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

const footerSocialListClassNames = {
  list: styles['footerSocialList'],
  listItem: styles['footerSocialListItem'],
};

export const FooterSocial: FC = () => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  return (
    <List
      role="list"
      aria-label="Social media links"
      classNames={footerSocialListClassNames}
      renderList={socialItems}
      renderItem={(listItem: SocialItemT) => (
        <Link
          key={listItem.href}
          href={listItem.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Перейти на сторінку ${listItem.alt}`}
        >
          <Image
            src={listItem.src}
            alt={listItem.alt}
            width={32}
            height={32}
            tabIndex={0}
            onFocus={handleFocus}
            className={styles['footerSocialImage']}
          />
        </Link>
      )}
    />
  );
};
