import { Button } from '@components/Button'
import { useTheme } from '@themes/index'
import { Text } from '@components/Text'
import { CalendarError } from '@components/CalendarError'

export interface CalendarYearsProps {
  year?: number
  firstYear?: number
  lastYear?: number
  columnCount?: number
  rowCount?: number
  onSelect?: (year: number) => void
}

export function CalendarYears(props: CalendarYearsProps) {
  // default first year of the map
  const defaultFirstSelectableYear = 1800

  // default last year of the map
  const defaultLastSelectableYear = 3000

  // default count of columns in one page for year grid
  const defaultPageColumnCount = 6

  // default count of rows in one page for year grid
  const defaultPageRowCount = 5

  // first selectable year of the map
  const selectableFirstYear = props.firstYear ?? defaultFirstSelectableYear

  // last selectable year of the map
  const selectableLastYear = props.lastYear ?? defaultLastSelectableYear

  // currently selected year
  const year =
    props.year ?? _getInitialYear(selectableFirstYear, selectableLastYear)

  // if invalid input, show error
  if (year < selectableFirstYear)
    return (
      <CalendarError
        msg={`current year '${year}' cannot be less than firstYear '${selectableFirstYear}'`}
      />
    )

  // if invalid input, show error
  if (year > selectableLastYear)
    return (
      <CalendarError
        msg={`current year '${year}' cannot be greater than lastYear '${selectableLastYear}'`}
      />
    )

  // count of columns in one page for year grid
  const pageColumnCount = props.columnCount ?? defaultPageColumnCount

  // count of rows in one page for year grid
  const pageRowCount = props.rowCount ?? defaultPageRowCount

  // count of cells in one page for year grid
  const pageYearCount = pageColumnCount * pageRowCount

  // if there is not layout to display, show error
  if (pageYearCount === 0)
    return (
      <CalendarError
        msg={`'pageColumnCount * pageRowCount' cannot result in '0'`}
      />
    )

  // first year from which to start calculating year positions on the grid
  const layoutFirstYear = 0

  // first year on current the page
  const pageFirstYear = year - ((year - layoutFirstYear) % pageYearCount)

  // last year on the current page
  const pageLastYear = pageFirstYear + pageYearCount

  // first selectable year on the current page
  const pageSelectableFirstYear = Math.max(selectableFirstYear, pageFirstYear)

  // first selectable year on the current page
  const pageSelectableLastYear = Math.min(selectableLastYear, pageLastYear)

  // count of selectable years on the current page
  const pageSelectableYearCount =
    pageSelectableLastYear - pageSelectableFirstYear

  // count of unselectable years before the first selectable year on the current page
  const pageYearCountBeforeSelectableFirstYear =
    pageSelectableFirstYear - pageFirstYear

  // count of unselectable years after the last selectable year on the current page
  const pageYearCountAfterSelectableLastYear =
    pageLastYear - pageSelectableLastYear

  // curreny range of years on the page in string format
  const pageSelectableYearRangeString = `${selectableFirstYear} - ${selectableLastYear}`

  const isPrevButtonEnabled = selectableFirstYear < pageFirstYear
  const isNextButtonEnabled = selectableLastYear > pageLastYear

  const theme = useTheme()

  function onPrevPress() {}
  function onNextPress() {}
  function onYearPress(year: number) {
    props.onSelect?.(year)
  }

  function YearList({ first, count, selected, faded, onPress }: any) {
    return Array.from({ length: count }, (_, index: number) => {
      const year = first + index

      return (
        <div
          key={index}
          onClick={() => onPress(year)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 4,
            borderRadius: 25,
            backgroundColor:
              year === selected
                ? theme.selectedListItemColor
                : theme.backgroundColor,
            padding: 10,
            height: 20,
          }}
        >
          <Text
            value={year}
            category='h6'
            style={{
              color: faded ? 'grey' : theme.h6Color,
            }}
          />
        </div>
      )
    })
  }

  return (
    <div>
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
        <Button
          icon='prev'
          size='sm'
          onPress={onPrevPress}
          enabled={isPrevButtonEnabled}
        />
        <Text
          value={pageSelectableYearRangeString}
          category='h4'
          align='center'
        />
        <Button
          icon='next'
          size='sm'
          onPress={onNextPress}
          enabled={isNextButtonEnabled}
        />
      </div>
      <div
        key='map'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${pageColumnCount}, 1fr)`,
          gridTemplateRows: `repeat(${pageRowCount}, auto)`,
        }}
      >
        <YearList
          first={pageFirstYear}
          count={pageYearCountBeforeSelectableFirstYear}
          onPress={onPrevPress}
          faded
        />
        <YearList
          first={pageSelectableFirstYear}
          count={pageSelectableYearCount}
          selected={year}
          onPress={onYearPress}
        />
        <YearList
          first={pageSelectableLastYear}
          count={pageYearCountAfterSelectableLastYear}
          onPress={onNextPress}
          faded
        />
      </div>
    </div>
  )
}

function _getInitialYear(firstYear: number, lastYear: number): number {
  return Math.min(Math.max(_getCurrentYear(), firstYear), lastYear)
}

function _getCurrentYear(): number {
  return new Date().getFullYear()
}
