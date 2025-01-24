import { CSSProperties, useEffect, useState } from 'react'
import { CalendarError } from '@components/CalendarError'
import { CalendarYears, CalendarYearProps } from '@components/CalendarYears'
import { CalendarMonths, CalendarMonthProps } from '@components/CalendarMonths'
import { CalendarDates, CalendarDateProps } from '@components/CalendarDates'
import {
  CalendarLayoutCellState,
  CalendarLayoutSelectionMode,
} from '@components/CalendarLayout'
import utils from '@utils'
import { ConditionalSwitch, ConditionalSwitchItem } from './ConditionalSwitch'

export type CalendarLayer = 'years' | 'months' | 'dates'

export type CalendarCellState = CalendarLayoutCellState

export interface CalendarProps {
  initPageDate?: Date
  firstDate?: Date
  lastDate?: Date
  states?: Record<number, CalendarCellState>
  useYear?: number
  useMonth?: number
  useDate?: number
  initLayer?: CalendarLayer
  selectionMode?: CalendarLayoutSelectionMode
  interactable?: boolean
  onPress?: (date: Date) => void
  onChange?: (args: { date: Date; state: CalendarCellState }) => void
  style?: CSSProperties
}

export function Calendar(props: CalendarProps) {
  const defaultFirstDate = utils.getMinDate()
  const defaultLastDate = utils.getMaxDate()
  const defaultIsInteractable = true
  const defaultSelectionMode: CalendarLayoutSelectionMode = 'single'
  const defaultInitLayer: CalendarLayer = 'years'

  const isInteractable = props.interactable ?? defaultIsInteractable

  const yearSelectionMode: CalendarLayoutSelectionMode =
    props.useMonth && props.useDate
      ? props.selectionMode ?? defaultSelectionMode
      : 'single'

  const monthSelectionMode: CalendarLayoutSelectionMode = props.useDate
    ? props.selectionMode ?? defaultSelectionMode
    : 'single'

  const dateSelectionMode: CalendarLayoutSelectionMode =
    props.selectionMode ?? defaultSelectionMode

  const yearsNextLayer: CalendarLayer | undefined = props.useMonth
    ? props.useDate
      ? undefined
      : 'dates'
    : 'months'

  // const monthsPrevLayer: CalendarLayer | undefined = props.useYear
  //   ? undefined
  //   : 'years'

  const monthsNextLayer: CalendarLayer | undefined = props.useDate
    ? undefined
    : 'dates'

  // const datesPrevLayer: CalendarLayer | undefined = props.useMonth
  //   ? props.useYear
  //     ? undefined
  //     : 'years'
  //   : 'months'

  const [layer, setLayer] = useState<CalendarLayer>(
    props.initLayer ?? defaultInitLayer,
  )

  const firstYear = (props.firstDate ?? defaultFirstDate).getUTCFullYear()
  const lastYear = (props.lastDate ?? defaultLastDate).getUTCFullYear()
  const [currentYear, setCurrentYear] = useState(2024)
  const [firstMonth, setFirstMonth] = useState(0)
  const [lastMonth, setLastMonth] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(11)
  const [firstDate, setFirstDate] = useState(0)
  const [lastDate, setLastDate] = useState(10)
  const [hasPrevYear, setHasPrevYear] = useState(currentYear > firstYear)
  const [hasNextYear, setHasNextYear] = useState(currentYear < lastYear)
  const [hasPrevMonth, setHasPrevMonth] = useState(currentMonth > firstYear)
  const [hasNextMonth, setHasNextMonth] = useState(currentMonth < lastYear)
  const [yearStates, setYearStates] = useState<
    Record<number, CalendarYearProps>
  >({})
  const [monthStates, setMonthStates] = useState<
    Record<number, CalendarMonthProps>
  >({})
  const [dateStates] = useState<
    Record<number, CalendarDateProps>
  >({})
  const [areYearStatesUpdated, setAreYearStatesUpdated] = useState(false)
  const [areMonthStatesUpdated, setAreMonthStatesUpdated] = useState(false)
  const [areDateStatesUpdated, setAreDateStatesUpdated] = useState(false)

  function onMonthYearPress() {
    if (!props.useYear) setLayer('years')
  }

  function onMonthPrevYearPress() {
    if (hasPrevYear) setCurrentYear(currentYear - 1)
  }

  function onMonthNextYearPress() {
    if (hasNextYear) setCurrentYear(currentYear + 1)
  }

  function onDateMonthPress() {
    if (!props.useMonth) setLayer('months')
    else if (!props.useYear) setLayer('years')
  }

  function onDatePrevMonthPress() {
    if (!hasPrevMonth) return

    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1)
      setCurrentMonth(11)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  function onDateNextMonthPress() {
    if (!hasNextMonth) return

    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1)
      setCurrentMonth(0)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  function onYearChange(args: {
    year: number
    state: CalendarLayoutCellState
  }) {
    const { year, state } = args

    setCurrentYear(year)

    if (yearsNextLayer) {
      setLayer(yearsNextLayer)
    } else {
      props.onChange?.({
        date: new Date(year, props.useMonth ?? 0, props.useDate),
        state: state,
      })
    }
  }

  function onMonthChange(args: {
    month: number
    state: CalendarLayoutCellState
  }) {
    const { month, state } = args

    setCurrentMonth(month)

    if (monthsNextLayer) {
      setLayer(monthsNextLayer)
    } else {
      props.onChange?.({
        date: new Date(currentYear, month, props.useDate),
        state: state,
      })
    }
  }

  function onDateChange(args: {
    date: number
    state: CalendarLayoutCellState
  }) {
    const { date, state } = args

    props.onChange?.({
      date: new Date(currentYear, currentMonth, date),
      state: state,
    })
  }

  function onYearPress(year: number) {
    if (props.useMonth && props.useDate)
      props.onPress?.(new Date(year, props.useMonth, props.useDate))
  }

  function onMonthPress(month: number) {
    if (props.useDate) {
      props.onPress?.(new Date(currentYear, month, props.useDate))
    }
  }

  function onDatePress(date: number) {
    props.onPress?.(new Date(currentYear, currentMonth, date))
  }

  function updateYearStates() {
    const yearStates: Record<number, CalendarYearProps> = {}

    for (const dateNumString in props.states) {
      const dateNum = parseInt(dateNumString)
      const year = new Date(dateNum).getFullYear()
      const state = props.states[dateNum]

      yearStates[year] = {
        state: props.useMonth && props.useDate ? state : 'selected',
      }
    }

    setYearStates(yearStates)
  }

  function updateMonthStates() {
    const monthStates: Record<number, CalendarMonthProps> = {}
    const hasRangeContinue = false

    for (const dateNumString in props.states) {
      const dateNum = parseInt(dateNumString)
      const date = new Date(dateNum)
      const year = date.getFullYear()
      const month = date.getMonth()
      const state = props.states[dateNum]

      if (year !== currentYear) continue

      monthStates[month] = {
        state: props.useDate ? state : 'selected',
      }
    }

    if (hasRangeContinue) {
      if (monthStates[0]?.state !== undefined)
        monthStates[0] = {
          state: 'range-continue',
        }
    }

    setMonthStates(monthStates)
  }

  function updateDateStates() {
    const dateStates: Record<number, CalendarDateProps> = {}

    for (const dateNumString in props.states) {
      const dateNum = parseInt(dateNumString)
      const fullDate = new Date(dateNum)
      const year = fullDate.getFullYear()
      const month = fullDate.getMonth()
      const date = fullDate.getDate()
      const state = props.states[dateNum]

      if (year !== currentYear || month !== currentMonth) continue

      dateStates[date] = {
        state: state,
      }
    }

    setMonthStates(dateStates)
  }

  useEffect(
    function () {
      switch (layer) {
        case 'years':
          setAreYearStatesUpdated(true)
          setAreMonthStatesUpdated(false)
          setAreDateStatesUpdated(false)
          updateYearStates()
          break

        case 'months':
          setAreYearStatesUpdated(false)
          setAreMonthStatesUpdated(true)
          setAreDateStatesUpdated(false)
          updateMonthStates()
          break

        case 'dates':
          setAreYearStatesUpdated(false)
          setAreMonthStatesUpdated(false)
          setAreDateStatesUpdated(true)
          updateDateStates()
          break

        default:
          break
      }
    },
    [props.states],
  )

  // Updates months when currentYear changes.
  useEffect(
    function () {
      if (currentYear === firstYear) {
        const firstMonth = (props.firstDate ?? defaultFirstDate)?.getMonth()

        setFirstMonth(firstMonth)
        setHasPrevYear(false)
      } else {
        setFirstMonth(0)
        setHasPrevYear(true)
      }

      if (currentYear >= lastYear) {
        const lastMonth = (props.lastDate ?? defaultLastDate)?.getMonth()

        setLastMonth(lastMonth)
        setHasNextYear(false)
      } else {
        setLastMonth(11)
        setHasNextYear(true)
      }
    },
    [currentYear],
  )

  useEffect(
    function () {
      switch (layer) {
        case 'years':
          if (areYearStatesUpdated) break

          setAreYearStatesUpdated(true)
          updateYearStates()
          break

        case 'months':
          if (areMonthStatesUpdated) break

          setAreMonthStatesUpdated(true)
          updateMonthStates()
          break

        case 'dates':
          if (areDateStatesUpdated) break

          setAreDateStatesUpdated(true)
          updateDateStates()
          break

        default:
          break
      }
    },
    [layer],
  )

  // Updates dates when currentYear or currentMonth changes.
  useEffect(
    function () {
      // If this is the first selectable month.
      if (currentYear === firstYear && currentMonth === firstMonth) {
        const firstDate = (props.firstDate ?? defaultFirstDate).getDate()

        setFirstDate(firstDate)
        setHasPrevMonth(false)
      } else {
        setFirstDate(1)
        setHasPrevMonth(true)
      }

      // If this is the last selectable month.
      if (currentYear === lastYear && currentMonth === lastMonth) {
        const lastDate = (props.lastDate ?? defaultLastDate).getDate()

        setLastDate(lastDate)
        setHasNextMonth(false)
      } else {
        const lastDate = utils.getLastDateOfMonth(
          new Date(currentYear, currentMonth),
        )

        setLastDate(lastDate)
        setHasNextMonth(true)
      }
    },
    [currentYear, currentMonth],
  )

  return (
    <div style={props.style}>
      <ConditionalSwitch condition={layer}>
        <ConditionalSwitchItem value='years'>
          <CalendarYears
            firstYear={firstYear}
            lastYear={lastYear}
            initialPageYear={2019}
            states={yearStates}
            isInteractable={isInteractable}
            selectionMode={yearSelectionMode}
            onChange={onYearChange}
            onPress={onYearPress}
          />
        </ConditionalSwitchItem>
        <ConditionalSwitchItem value='months'>
          <CalendarMonths
            year={currentYear}
            firstMonth={firstMonth}
            lastMonth={lastMonth}
            states={monthStates}
            onYearPress={onMonthYearPress}
            onPrevYearPress={hasPrevYear ? onMonthPrevYearPress : undefined}
            onNextYearPress={hasPrevYear ? onMonthNextYearPress : undefined}
            isInteractable={isInteractable}
            selectionMode={monthSelectionMode}
            onChange={onMonthChange}
            onPress={onMonthPress}
          />
        </ConditionalSwitchItem>
        <ConditionalSwitchItem value='dates'>
          <CalendarDates
            month={new Date(currentYear, currentMonth)}
            firstDate={firstDate}
            lastDate={lastDate}
            states={dateStates}
            onMonthPress={onDateMonthPress}
            onPrevMonthPress={hasPrevMonth ? onDatePrevMonthPress : undefined}
            onNextMonthPress={hasNextMonth ? onDateNextMonthPress : undefined}
            isInteractable={isInteractable}
            selectionMode={dateSelectionMode}
            onChange={onDateChange}
            onPress={onDatePress}
          />
        </ConditionalSwitchItem>
        <ConditionalSwitchItem default>
          <CalendarError msg='No layer to show.' />
        </ConditionalSwitchItem>
      </ConditionalSwitch>
    </div>
  )
}
