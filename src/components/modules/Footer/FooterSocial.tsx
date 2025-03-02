import { type FC } from 'react';

import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';

import Image from 'next/image';
import Link from 'next/link';

import { SocialItemT } from '@/types/FooterType';

import { List } from '@/index';

import { socialItems } from '@/static/socialItems';

import styles from './Footer.module.scss';

const footerSocialListClassNames = {
  list: styles['footerSocialList'],
  listItem: styles['footerSocialListItem'],
};

export const FooterSocial: FC = () => {
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleSpeak = (text: string) => {
    if (isSpeechEnabled) speakText(text);
  };

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
            onMouseEnter={(e) => handleSpeak(e.currentTarget.alt)}
            onFocus={(e) => handleSpeak(e.currentTarget.alt)}
            className={styles['footerSocialImage']}
          />
        </Link>
      )}
    />
  );
};
