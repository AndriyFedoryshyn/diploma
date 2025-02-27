'use client';

import { useState } from 'react';
import { useFetch } from '@/shared/hooks/useFetch';

import {
  AlertBanner,
  Section,
  ButtonChart,
  SettlementsList,
  Header,
} from '@/index';

import { AreasT } from '@/shared/types/AreasType';

import styles from '@/shared/styles/pages/Home.module.scss';

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
      <Section className={styles['home']}>
        <AlertBanner />
        <ButtonChart />
        <SettlementsList data={data as AreasT} searchQuery={searchQuery} />
      </Section>
    </>
  );
};
