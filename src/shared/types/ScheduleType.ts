export interface ScheduleHourI {
  id: number;
  hours: Array<string>;
  isLightOn: boolean;
}

export type ScheduleHoursT = ScheduleHourI[];
