import {
  CalendarLayout,
  CalendarLayoutCell,
  CalendarLayoutCellState,
  CalendarLayoutSelectionMode,
} from '@components/CalendarLayout'
import utils from '@utils'

export interface CalendarDateProps {
  /// The state of this date.
  state?: CalendarLayoutCellState

  /// Can user select this date or not.
  isInteractable?: boolean
}

export interface CalendarDatesProps {
  /// The month for which the dates are to be displayed.
  month?: Date

  /// States of dates.
  states?: Record<number, CalendarDateProps>

  /// First interactable date of this month.
  firstDate?: number

  /// Last interactable date of this month.
  lastDate?: number

  /// States of dates of previous month. These are needed when displaying some
  /// dates from previous month to fill the week.
  prevMonthStates?: Record<number, CalendarDateProps>

  /// States of dates of next month. These are needed when displaying some
  /// dates from next month to fill the week.
  nextMonthStates?: Record<number, CalendarDateProps>

  /// Same as defined in `CalendarLayout`.
  isInteractable?: boolean

  /// Same as defined in `CalendarLayout`.
  selectionMode?: CalendarLayoutSelectionMode

  /// This callback is called when the month title is pressed.
  onMonthPress?: () => void

  /// This callback is called when prev month button is pressed.
  onPrevMonthPress?: () => void

  /// This callback is called when next month button is pressed.
  onNextMonthPress?: () => void

  /// This callback is called when next month button is pressed.
  onPress?: (date: number) => void

  onChange?: (args: { date: number; state: CalendarLayoutCellState }) => void
}

export function CalendarDates(props: CalendarDatesProps) {
  const monthName = props.month && utils.getMonthName(props.month)
  const month = props.month ?? new Date()
  const dayInWeekCount = 7
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const gridSize = 42

  const prevMonth = utils.getPrevMonth(month)
  const prevMonthLastDate = utils.getLastDateOfMonth(prevMonth)
  const thisMonthDateCount = utils.getLastDateOfMonth(month)
  const thisMonthFirstDay = utils.getDay(month, 'm')
  const thisMonthFirstInteractableDate = props.firstDate ?? 1
  const thisMonthLastInteractableDate = props.lastDate ?? thisMonthDateCount

  // Number of dates of prev month that is to displayed on this page.
  const thisPagePrevMonthDateCount = thisMonthFirstDay

  const cells: CalendarLayoutCell[] = Array.from(
    { length: gridSize },
    (_, index: number) => {
      const isPrevMonthDate = index < thisPagePrevMonthDateCount
      const isNextMonthDate =
        index + 1 > thisPagePrevMonthDateCount + thisMonthDateCount

      const date = isPrevMonthDate
        ? prevMonthLastDate - thisPagePrevMonthDateCount + index + 1
        : isNextMonthDate
        ? index + 1 - thisPagePrevMonthDateCount - thisMonthDateCount
        : index + 1 - thisPagePrevMonthDateCount

      const dateProps = isPrevMonthDate
        ? props.prevMonthStates?.[date]
        : isNextMonthDate
        ? props.nextMonthStates?.[date]
        : props.states?.[date]

      const getIsInteractable = () => {
        if (dateProps?.isInteractable !== undefined)
          return dateProps.isInteractable

        if (isPrevMonthDate || isNextMonthDate) return false

        return (
          date >= thisMonthFirstInteractableDate &&
          date <= thisMonthLastInteractableDate
        )
      }

      return {
        value: date,
        state: dateProps?.state,
        isInteractable: getIsInteractable(),
      }
    },
  )

  function onCellPress(index: number) {
    props.onPress?.(thisPagePrevMonthDateCount + index)
  }

  function onChange(args: { index: number; state: CalendarLayoutCellState }) {
    const { index, state } = args
    props.onChange?.({ date: thisPagePrevMonthDateCount + index, state: state })
  }

  return (
    <CalendarLayout
      cells={cells}
      columnCount={dayInWeekCount}
      columnHeaders={weekDays}
      title={`${month.getFullYear()} ${monthName}`}
      onTitlePress={props.onMonthPress}
      onPrevPagePress={props.onPrevMonthPress}
      onNextPagePress={props.onNextMonthPress}
      onChange={onChange}
      onCellPress={onCellPress}
      isInteractable={props.isInteractable}
      selectionMode={props.selectionMode}
    />
  )
}
