import {
  CalendarLayout,
  CalendarLayoutCell,
  CalendarLayoutCellState,
  CalendarLayoutSelectionMode,
} from '@components/CalendarLayout'
import { CalendarError } from '@components/CalendarError'
import utils from '../utils'

export interface CalendarMonthProps {
  state?: CalendarLayoutCellState
  isInteractable?: boolean
}

export interface CalendarMonthsProps {
  year?: number
  firstMonth?: number
  lastMonth?: number
  states?: Record<number, CalendarMonthProps>
  isInteractable?: boolean
  selectionMode?: CalendarLayoutSelectionMode
  columnCount?: number
  rowCount?: number
  onYearPress?: () => void
  onPrevYearPress?: () => void
  onNextYearPress?: () => void
  onPress?: (month: number) => void
  onChange?: (args: { month: number; state: CalendarLayoutCellState }) => void
}

export function CalendarMonths(props: CalendarMonthsProps) {
  const monthNames = utils.monthNames
  const defaultFirstMonth = 0
  const defaultLastMonth = 11
  const defaultColumnCount = 4
  const defaultRowCount = 4

  const columnCount = props.columnCount ?? defaultColumnCount
  const rowCount = props.rowCount ?? defaultRowCount
  const firstMonth = props.firstMonth ?? defaultFirstMonth
  const lastMonth = props.lastMonth ?? defaultLastMonth
  const monthCount = lastMonth - firstMonth + 1

  if (firstMonth > lastMonth) {
    return (
      <CalendarError
        msg={`firstMonth '${firstMonth}' cannot be greater than lastMonth '${lastMonth}'`}
      />
    )
  }

  const cells: CalendarLayoutCell[] = Array.from(
    { length: monthCount },
    (_, index: number) => {
      const state = props.states?.[index]
      const isInteractable =
        state?.isInteractable ?? (index >= firstMonth || index <= lastMonth)

      return {
        value: monthNames[index],
        state: state?.state,
        isInteractable: isInteractable,
      }
    },
  )

  function onChange(args: { index: number; state: CalendarLayoutCellState }) {
    const { index, state } = args
    props.onChange?.({ month: index, state: state })
  }

  return (
    <CalendarLayout
      cells={cells}
      columnCount={columnCount}
      rowCount={rowCount}
      title={props.year}
      onTitlePress={props.onYearPress}
      onPrevPagePress={props.onPrevYearPress}
      onNextPagePress={props.onNextYearPress}
      onChange={onChange}
      onCellPress={props.onPress}
      isInteractable={props.isInteractable}
      selectionMode={props.selectionMode}
    />
  )
}
