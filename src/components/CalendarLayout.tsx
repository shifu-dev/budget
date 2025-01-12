import { Button } from '@components/Button'
import { Text, TextValue } from '@components/Text'
import { CalendarError } from '@components/CalendarError'
import { useTheme } from '@themes/index'
import { CSSProperties } from 'react'

/// The mode in which user can select cells on the layout.
export type CalendarLayoutSelectionMode = 'single' | 'range' | 'hybrid'

/// State of a cell in `CalendarLayout`.
///
/// @option selected The cell is selected. Note, even if two adjacent
//                   cells are selected. This does not make them a range.
/// @option range-begin The cell marks the start of a range.
/// @option range-end The cell marks the end of a range.
export type CalendarLayoutCellState =
  | undefined
  | 'selected'
  | 'range-begin'
  | 'range-end'
  | 'range-continue'

/// This type defines a cell in `CalendarLayout`.
export interface CalendarLayoutCell {
  // Value to display on the cell.
  value: TextValue

  // State of the cell.
  state?: CalendarLayoutCellState

  // Can user interact with this cell.
  isInteractable?: boolean
}

export interface CalendarLayoutProps {
  // Title of the layout.
  title?: TextValue

  // The cells to display.
  cells?: CalendarLayoutCell[]

  // The cell on the prev page. This is used to make decision about selecting a
  // cell as `range-begin` or just `range`.
  prevPageCell?: CalendarLayoutCell

  // The cell on the next page. This is used to make decision about selecting a
  // cell as `range-begin` or just `range`.
  nextPageCell?: CalendarLayoutCell

  // Number of columns to display. If this is undefined, the its value is calculated
  // based on number of cells in `cells` and `rowCount`.
  columnCount?: number

  // Number of rows to display. If this is undefined, the its value is calculated
  // based on number of cells in `cells` and `columnCount`.
  rowCount?: number

  // Headers for columns. For example, to show day names for day numbers.
  // If the length of array is smaller than `columnCount`, it sets headers empty
  // for rest of the columns. If it is bigger, then it displays only the first
  // `columnCount` headers.
  columnHeaders?: string[]

  // Headers for rows. For example, to show week numbers.
  //
  // If the length of array is smaller than `rowCount`, it sets headers empty
  // for rest of the rows. If it is bigger, then it displays only the first
  // `rowCount` headers.
  rowHeaders?: string[]

  // This callback is called when the title is pressed.
  onTitlePress?: () => void

  // This callback is called when the prev page button is pressed.
  // You may want to update the layout in this callback.
  onPrevPagePress?: () => void

  // This callback is called when the next page button is pressed.
  // You may want to update the layout in this callback.
  onNextPagePress?: () => void

  // This callback is called whenever a cell is pressed.
  //
  // Note: This does not necessarily mean that the cell was selected. For selections,
  //       use `onSelectionChange` callback.
  onCellPress?: (index: number) => void

  onChange?: (args: { index: number; state: CalendarLayoutCellState }) => void

  // Can the user interact with the calendar or is it just for view only.
  isInteractable?: boolean

  // The mode in which user can select cells on the layout.
  selectionMode?: CalendarLayoutSelectionMode
}

export function CalendarLayout(props: CalendarLayoutProps) {
  // Default count of columns in one page for year grid.
  const defaultPageColumnCount = 6

  // Default count of rows in one page for year grid.
  const defaultPageRowCount = 5

  // Count of columns in one page for year grid.
  const pageColumnCount = props.columnCount ?? defaultPageColumnCount

  // Count of rows in one page for year grid.
  const pageRowCount = props.rowCount ?? defaultPageRowCount

  // Count of cells in one page for year grid.
  const pageCellCount = pageColumnCount * pageRowCount

  // If there is not layout to display, show error.
  if (pageCellCount === 0)
    return (
      <CalendarError msg={`'columnCount * rowCount' cannot result in '0'`} />
    )

  const theme = useTheme()

  function onCellPress(index: number) {
    props.onCellPress?.(index)
    handleCellPress?.(index)
  }

  function handleCellPressSingle(index: number) {
    props.onChange?.({ index: index, state: 'selected' })
  }

  let lastSelectedRangeStartIndex: number | undefined = undefined
  function handleCellPressRange(index: number) {
    if (lastSelectedRangeStartIndex === undefined) {
      lastSelectedRangeStartIndex = index
      return
    }

    props.onChange?.({
      index: lastSelectedRangeStartIndex,
      state: 'range-begin',
    })
    props.onChange?.({ index: index, state: 'range-end' })
    lastSelectedRangeStartIndex = undefined
  }

  function handleCellPressHybrid(index: number) {
    if (!props.onChange) return

    const cell: CalendarLayoutCell = props.cells?.[index] ?? { value: 0 }
    if (cell === undefined) return
    const prevCell = cell
    const nextCell = cell

    const state = cell.state

    if (state === undefined) {
      if (prevCell.state === undefined && nextCell.state === undefined) {
        function getIsInRange(): boolean {
          return true
        }

        if (getIsInRange()) {
          props.onChange({ index: index - 1, state: 'range-end' })
          props.onChange({ index: index + 1, state: 'range-begin' })
          return
        }

        props.onChange({ index: index, state: 'selected' })
        return
      }

      if (prevCell.state === undefined && nextCell.state === 'selected') {
        props.onChange({ index: index, state: 'range-begin' })
        props.onChange({ index: index + 1, state: 'range-end' })
        return
      }

      if (prevCell.state === undefined && nextCell.state === 'range-begin') {
        props.onChange({ index: index, state: 'range-begin' })
        props.onChange({ index: index + 1, state: undefined })
        return
      }

      if (prevCell.state === undefined && nextCell.state === 'range-end') {
        props.onChange({ index: index - 1, state: 'range-end' })
        props.onChange({ index: index + 1, state: 'selected' })
        return
      }

      if (prevCell.state === 'selected' && nextCell.state === undefined) {
        props.onChange({ index: index - 1, state: 'range-begin' })
        props.onChange({ index: index, state: 'range-end' })
      }

      if (prevCell.state === 'selected' && nextCell.state === 'selected') {
        props.onChange({ index: index - 1, state: 'range-begin' })
        props.onChange({ index: index + 1, state: 'range-end' })
      }

      if (prevCell.state === 'selected' && nextCell.state === 'range-begin') {
        props.onChange({ index: index - 1, state: 'range-begin' })
        props.onChange({ index: index + 1, state: undefined })
      }

      if (prevCell.state === 'selected' && nextCell.state === 'range-end') {
        // error
        return
      }

      if (prevCell.state === 'range-begin' && nextCell.state === undefined) {
        props.onChange({ index: index - 1, state: 'selected' })
        props.onChange({ index: index + 1, state: 'range-begin' })
      }

      if (prevCell.state === 'range-begin' && nextCell.state === 'selected') {
        // error
        return
      }

      if (
        prevCell.state === 'range-begin' &&
        nextCell.state === 'range-begin'
      ) {
        // error
        return
      }

      if (prevCell.state === 'range-begin' && nextCell.state === 'range-end') {
        props.onChange({ index: index - 1, state: 'selected' })
        props.onChange({ index: index + 1, state: 'selected' })
      }
    }

    if (state === 'selected') {
      props.onChange({ index: index, state: undefined })
      return
    }

    if (state === 'range-begin') {
      props.onChange({ index: index, state: undefined })
      props.onChange({ index: index + 1, state: 'range-begin' })
      return
    }

    if (state === 'range-end') {
      props.onChange({ index: index, state: undefined })
      props.onChange({ index: index - 1, state: 'range-end' })
      return
    }
  }

  const handleCellPress =
    props.selectionMode === 'single'
      ? handleCellPressSingle
      : props.selectionMode === 'range'
      ? handleCellPressRange
      : props.selectionMode === 'hybrid'
      ? handleCellPressHybrid
      : handleCellPressSingle

  function TopBar() {
    return (
      <div
        key='top-bar'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: theme.cardColor,
          padding: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <div
          style={{
            width: 70,
          }}
        >
          {props.onPrevPagePress && (
            <Button icon='prev' size='sm' onPress={props.onPrevPagePress} />
          )}
        </div>
        <Button label={props.title} onPress={props.onTitlePress} />
        <div
          style={{
            width: 70,
          }}
        >
          {props.onPrevPagePress && (
            <Button icon='next' size='sm' onPress={props.onNextPagePress} />
          )}
        </div>
      </div>
    )
  }

  function ColumnHeaders() {
    if (!props.columnHeaders) return

    return (
      <div
        key='map-columns'
        style={{
          display: 'flex',
          height: 40,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: theme.cardColor,
        }}
      >
        {props.columnHeaders.map(name => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Text value={name} category='h6' />
          </div>
        ))}
      </div>
    )
  }

  function RowHeaders() {
    return undefined
  }

  function CellGrid() {
    return (
      <div
        key='grid'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${pageColumnCount}, 1fr)`,
          gridTemplateRows: `repeat(${pageRowCount}, auto)`,
          borderWidth: 0,
          borderStyle: 'solid',
          borderColor: 'white',
        }}
      >
        {props.cells?.map((cell: CalendarLayoutCell, index: number) => (
          <Cell cell={cell} index={index} />
        ))}
      </div>
    )
  }

  let lastRangeStartIndex: number | undefined = undefined
  function Cell(args: { cell: CalendarLayoutCell; index: number }) {
    const { cell, index } = args
    const state = cell.state
    const isInteractable = cell.isInteractable ?? true

    const onPress = isInteractable ? () => onCellPress(index) : undefined

    const baseStyle: CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 20,
      margin: 4,
      padding: 10,
      borderRadius: 25,
      color: isInteractable ? theme.h6Color : theme.disabledTextColor,
      cursor: isInteractable ? 'pointer' : undefined,
    }

    const selectedStyle: CSSProperties = {
      ...baseStyle,
      backgroundColor: theme.selectedListItemColor,
    }

    const rangeStartStyle: CSSProperties = {
      ...baseStyle,
      backgroundColor: theme.selectedListItemColor,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      marginRight: 0,
      paddingRight: 14,
    }

    const rangeEndStyle: CSSProperties = {
      ...baseStyle,
      backgroundColor: theme.selectedListItemColor,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      marginLeft: 0,
      paddingLeft: 14,
    }

    const rangeContinueStyle: CSSProperties = {
      ...baseStyle,
      backgroundColor: theme.selectedListItemColor,
      borderRadius: 0,
      marginInline: 0,
    }

    const style =
      state === 'selected'
        ? selectedStyle
        : state === 'range-begin'
        ? rangeStartStyle
        : state === 'range-continue' || lastRangeStartIndex
        ? rangeContinueStyle
        : state === 'range-end'
        ? rangeEndStyle
        : baseStyle

    if (state === 'range-begin') {
      lastRangeStartIndex = index
    } else if (state === 'range-end') {
      lastRangeStartIndex = undefined
    }

    return (
      <div key={index} onClick={onPress} style={style}>
        <Text
          value={cell.value}
          category='h6'
          style={{
            color: 'inherit',
          }}
        />
      </div>
    )
  }

  return (
    <div id='calendar-layout'>
      <TopBar />
      <ColumnHeaders />
      <RowHeaders />
      <CellGrid />
    </div>
  )
}
