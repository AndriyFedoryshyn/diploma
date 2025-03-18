import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { Div, Heading, ChartList } from '@/index';

import { chartButtons } from '@/static/chartButtons';

import styles from './ButtonsChart.module.scss';

const chartListClassNames = {
  list: styles['chartList'],
  listItem: styles['chartListItem'],
  button: styles['chartListItemButton'],
  numberOfGroup: styles['chartListItemNumberOfGroup'],
};

export const ButtonChart: FC = () => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  return (
    <Div className={styles['buttonsChartBlock']}>
      <Heading
        level="h2"
        className={styles['chartHeading']}
        id="chartHeading"
        tabIndex={0}
        onFocus={handleFocus}
      >
        Перейти до графіка за чергою
      </Heading>

      <ChartList
        aria-labelledby="chartHeading"
        classNames={chartListClassNames}
        list={chartButtons}
      />
    </Div>
  );
};
