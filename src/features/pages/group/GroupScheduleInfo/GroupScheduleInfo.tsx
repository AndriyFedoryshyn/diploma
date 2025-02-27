import { type FC } from 'react';

import {
  Div,
  GroupScheduleInfoPeriods,
  GroupScheduleStatistic,
  GroupScheduleInfoDate,
  Section,
} from '@/index';

import styles from '@/shared/styles/pages/Group.module.scss';

interface GroupScheduleInfoPropsI {
  firstPart: string | undefined;
  secondPart: string | undefined;
}

export const GroupScheduleInfo: FC<GroupScheduleInfoPropsI> = ({
  firstPart,
  secondPart,
}) => {
  return (
    <Section className={styles['sheduleInfo']}>
      <Div className={styles['sheduleInfoContainer']}>
        <GroupScheduleInfoDate firstPart={firstPart} secondPart={secondPart} />
        <GroupScheduleInfoPeriods />
        <GroupScheduleStatistic />
      </Div>
    </Section>
  );
};
