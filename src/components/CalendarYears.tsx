import { useState, useEffect } from 'react'
import {
  CalendarLayout,
  CalendarLayoutCell,
  CalendarLayoutCellState,
  CalendarLayoutSelectionMode,
} from '@components/CalendarLayout'
import { CalendarError } from '@components/CalendarError'
import utils from '../utils'

export interface CalendarYearProps {
  state?: CalendarLayoutCellState
  isInteractable?: boolean
}

export interface CalendarYearsProps {
  initialPageYear?: number
  initialPageIndex?: number
  firstYear?: number
  lastYear?: number
  states?: Record<number, CalendarYearProps>
  columnCount?: number
  rowCount?: number
  onPress?: (year: number) => void
  onChange?: (args: { year: number; state: CalendarLayoutCellState }) => void
  isInteractable?: boolean
  selectionMode?: CalendarLayoutSelectionMode
}

export function CalendarYears(props: CalendarYearsProps) {
  // Default first year of the map.
  const defaultFirstSelectableYear = utils.getMinYear()

  // Default last year of the map.
  const defaultLastSelectableYear = utils.getMaxYear()

  // Default count of columns in one page for year grid.
  const defaultPageColumnCount = 6

  // Default count of rows in one page for year grid.
  const defaultPageRowCount = 5

  // First selectable year of the map.
  const selectableFirstYear = props.firstYear ?? defaultFirstSelectableYear

  // Last selectable year of the map.
  const selectableLastYear = props.lastYear ?? defaultLastSelectableYear

  // Count of selectable years.
  const selectableYearCount = selectableLastYear - selectableFirstYear

  // Year to calculate the initial page.
  const initialPageYear =
    props.initialPageYear ??
    _getInitialYear(selectableFirstYear, selectableLastYear)

  // If initial page year is out of bounds.
  if (
    initialPageYear < selectableFirstYear ||
    initialPageYear > selectableLastYear
  )
    return (
      <CalendarError
        msg={`initialPageYear '${initialPageYear}' must be in bounds [${selectableFirstYear}, '${selectableLastYear}']`}
      />
    )

  // Count of columns in one page for year grid.
  const pageColumnCount = props.columnCount ?? defaultPageColumnCount

  // Count of rows in one page for year grid.
  const pageRowCount = props.rowCount ?? defaultPageRowCount

  // Count of cells in one page for year grid.
  const pageCellCount = pageColumnCount * pageRowCount

  // Index of the initial page.
  const initialPageIndex = Math.floor(
    (initialPageYear - selectableFirstYear) / pageCellCount,
  )

  const pageCount = selectableYearCount / pageCellCount

  const [selectionStates, setSelectionStates] = useState<
    Record<number, CalendarLayoutCellState>
  >([])

  const [thisPageIndex, setThisPageIndex] = useState(initialPageIndex)
  const [pageFirstYear, setPageFirstYear] = useState(0)
  const [pageSelectableYearRangeString, setPageSelectableYearRangeString] =
    useState('')
  const [hasPrevPage, setHasPrevPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [prevPageCell, setPrevPageCell] = useState<CalendarLayoutCell>()
  const [nextPageCell, setNextPageCell] = useState<CalendarLayoutCell>()

  useEffect(() => {
    const pageFirstYear = selectableFirstYear + thisPageIndex * pageCellCount
    setPageFirstYear(pageFirstYear)

    const pageLastYear = pageFirstYear + pageCellCount
    const pageSelectableFirstYear = Math.max(selectableFirstYear, pageFirstYear)
    const pageSelectableLastYear = Math.min(selectableLastYear, pageLastYear)
    setPageSelectableYearRangeString(
      `${pageSelectableFirstYear} - ${pageSelectableLastYear - 1}`,
    )

    setHasPrevPage(thisPageIndex > 0)
    setHasNextPage(thisPageIndex + 1 < pageCount)
    setPrevPageCell({
      value: pageFirstYear - 1,
      state: selectionStates[pageFirstYear - 1],
    })
    setNextPageCell({
      value: pageLastYear + 1,
      state: selectionStates[pageLastYear + 1],
    })
  }, [thisPageIndex])

  function onPrevPagePress() {
    setThisPageIndex(thisPageIndex - 1)
  }

  function onNextPagePress() {
    setThisPageIndex(thisPageIndex + 1)
  }

  const cells: CalendarLayoutCell[] = Array.from(
    { length: pageCellCount },
    (_, index: number) => {
      const year = pageFirstYear + index
      const state = selectionStates[year]

      return {
        value: year,
        state: state,
        isInteractable:
          props.states?.[year]?.isInteractable ??
          (year >= selectableFirstYear && year <= selectableLastYear),
      }
    },
  )

  function onChange(args: { index: number; state: CalendarLayoutCellState }) {
    const { index, state } = args
    props.onChange?.({ year: pageFirstYear + index, state: state })
  }

  function onCellPress(index: number) {
    props.onPress?.(pageFirstYear + index)
  }

  return (
    <CalendarLayout
      cells={cells}
      columnCount={pageColumnCount}
      rowCount={pageRowCount}
      title={pageSelectableYearRangeString}
      onPrevPagePress={hasPrevPage ? onPrevPagePress : undefined}
      onNextPagePress={hasNextPage ? onNextPagePress : undefined}
      prevPageCell={prevPageCell}
      nextPageCell={nextPageCell}
      onChange={onChange}
      onCellPress={onCellPress}
    />
  )
}

function _getInitialYear(firstYear: number, lastYear: number): number {
  return utils.clamp(utils.getCurrentYear(), firstYear, lastYear)
}
