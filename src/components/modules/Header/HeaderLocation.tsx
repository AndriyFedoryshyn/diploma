import { type FC } from 'react';

import Image from 'next/image';

import { Div } from '@/index';

import { HeaderLocationProps } from '@/interfaces/Header';

import styles from './Header.module.scss';

export const HeaderLocation: FC<HeaderLocationProps> = ({ handleFocus }) => {
  return (
    <Div className={styles['headerLocation']} tabIndex={0}>
      <Image
        src={'/icons/location_logo.svg'}
        className={styles['headerLocationIcon']}
        alt="Логотип локації"
        width={15}
        height={15}
        priority
        onFocus={handleFocus}
      />
      <h5 onFocus={handleFocus} className={styles['headerLocationMark']}>
        Львівська обл.
      </h5>
    </Div>
  );
};
