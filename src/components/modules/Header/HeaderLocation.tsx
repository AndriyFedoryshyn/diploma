import { type FC } from 'react';

import Image from 'next/image';

import { Div } from '@/index';

import { HeaderLocationProps } from '@/interfaces/Header';

import styles from './Header.module.scss';

export const HeaderLocation: FC<HeaderLocationProps> = ({
  handleMouseEnter,
  handleImageMouseEnter,
  handleFocus,
}) => {
  return (
    <Div
      className={styles['headerLocation']}
      onMouseEnter={handleImageMouseEnter}
      tabIndex={0}
    >
      <Image
        src={'/icons/location_logo.svg'}
        className={styles['headerLocationIcon']}
        alt="Логотип локації"
        width={15}
        height={15}
        priority
        onFocus={handleFocus}
        onMouseEnter={handleImageMouseEnter}
      />
      <h5
        onMouseEnter={handleMouseEnter}
        className={styles['headerLocationMark']}
      >
        Львівська обл.
      </h5>
    </Div>
  );
};
