'use client';

import { type FC, ReactNode } from 'react';

type WrapperPropsT = {
  children: ReactNode;
};

import styles from './Wrapper.module.scss';

export const Wrapper: FC<WrapperPropsT> = ({ children }) => {
  return <div className={styles['wrapper']}>{children}</div>;
};
