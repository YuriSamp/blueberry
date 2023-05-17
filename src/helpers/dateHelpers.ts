export function dateCalendarConvert(year: number, month: number): string {
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  return `${year}-${formattedMonth}`;
}
