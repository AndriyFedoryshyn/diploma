import { type FC } from 'react';

import Image from 'next/image';

import { Div, Heading } from '@/index';

import { HeaderLocationProps } from '@/interfaces/Header';

import styles from './Header.module.scss';

export const HeaderLocation: FC<HeaderLocationProps> = ({ handleFocus }) => {
  return (
    <Div
      className={styles['headerLocation']}
      onFocus={handleFocus}
      tabIndex={0}
    >
      <Image
        src={'/icons/location_logo.svg'}
        className={styles['headerLocationIcon']}
        alt="Логотип локації"
        tabIndex={0}
        width={15}
        height={15}
        priority
        onFocus={handleFocus}
      />
      <Heading level="h5" className={styles['headerLocationMark']}>
        Львівська обл.
      </Heading>
    </Div>
  );
};
