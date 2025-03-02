import { FC, ReactNode } from 'react';

import styles from './Main.module.scss';

type MainPropsT = {
  children: ReactNode;
};

export const Main: FC<MainPropsT> = ({ children }) => {
  return <main className={styles['main']}>{children}</main>;
};
