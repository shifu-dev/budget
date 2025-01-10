export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function getMinDate(): Date {
  return new Date(-8_640_000_000_000_000)
}

export function getMaxDate(): Date {
  return new Date(8_640_000_000_000_000)
}

export function getMinYear(): number {
  return getMinDate().getFullYear()
}

export function getMaxYear(): number {
  return getMaxDate().getFullYear()
}

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

export function getMonthName(date: Date): string {
  return monthNames[date.getMonth()]
}

export function getPrevMonth(date: Date): Date {
  const year = date.getFullYear()
  const month = date.getMonth()

  return new Date(year, month - 1, 1)
}

export function getLastDateOfMonth(date: Date): number {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month + 1, 0).getDate()
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function getDayCountForMonth(date: Date): Date {
  return new Date(2008, (date as any) + 1, 0)
}

export function getFirstDayOfWeek(date: Date): number {
  date.setDate(1)
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 ? 7 : dayOfWeek
}

export function getDay(date: Date, firstDay: 'm' | 's' = 's'): number {
  const day = date.getDay()
  return firstDay === 's' ? day : day === 0 ? 6 : day - 1
}

export function generateNumList(from: number, to: number): string[] {
  return Array(to - from + 1)
    .fill(undefined)
    .map((_, index) => `${from + index}`)
}

export default {
  monthNames,
  getMinDate,
  getMaxDate,
  getMinYear,
  getMaxYear,
  getCurrentYear,
  getMonthName,
  getPrevMonth,
  getLastDateOfMonth,
  clamp,
  getDayCountForMonth,
  getFirstDayOfWeek,
  getDay,
  generateNumList,
}
