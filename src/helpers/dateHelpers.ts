function formatDateString(date: Date): string {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const formattedDay = day < 10 ? `0${day}` : `${day}`
  const formattedMonth = month < 10 ? `0${month}` : `${month}`

  return `${year}-${formattedMonth}-${formattedDay}`
}

export function todayDateToDateInput(): string {
  const date = new Date()
  return formatDateString(date)
}

export function dateCalendarConvert(year: number, month: number): string {
  const formattedMonth = month < 10 ? `0${month}` : `${month}`
  return `${year}-${formattedMonth}`
}
