'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';

import {
  AlertBanner,
  ButtonChart,
  SettlementsList,
  Header,
  Main,
} from '@/index';

import { AreasT } from '@/types/AreasType';

import styles from '@/styles/pages/Home.module.scss';

export const HomeClient = () => {
  const { data } = useFetch<AreasT>({
    url: '/api/locations.json',
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const settlements: AreasT = data || [];

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  return (
    <>
      <Header onSearch={handleSearch} settlements={settlements} />
      <Main className={styles['home']}>
        <AlertBanner />
        <ButtonChart />
        <SettlementsList data={data as AreasT} searchQuery={searchQuery} />
      </Main>
    </>
  );
};
