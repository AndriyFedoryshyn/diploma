const days: Array<string> = [
  'Неділя',
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  "П'ятниця",
  'Субота',
];
const months: Array<string> = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const date = new Date();
const dayOfWeek = days[date.getDay()];
const day = String(date.getDate()).padStart(2, '0');
const month = months[date.getMonth()];
const year = date.getFullYear();

export const formateDate = `${dayOfWeek}. ${day}.${month}.${year}`;
