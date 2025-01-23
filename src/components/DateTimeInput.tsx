import { useState } from 'react'
import { Calendar, CalendarCellState } from '@components/Calendar'
import { TimeWheel } from '@components/TimeWheel'
import {
  ConditionalSwitch,
  ConditionalSwitchItem,
} from '@components/ConditionalSwitch'
import { SelectList } from '@components/SelectList'

export interface DateTimeInputProps {
  value: Date
  onChange?: (value: Date) => void
}

export function DateTimeInput(props: DateTimeInputProps) {
  const [inputMode, setInputMode] = useState<'date' | 'time'>('date')

  function onCalendarStateChange(args: {
    date: Date
    state: CalendarCellState
  }) {
    if (args.state !== 'selected') return

    props.onChange?.(args.date)
  }

  return (
    <div
      style={{
        paddingBottom: 10,
      }}
    >
      <ConditionalSwitch condition={inputMode}>
        <ConditionalSwitchItem value='date'>
          <Calendar
            selectionMode='single'
            states={{
              [props.value.getTime()]: 'selected',
            }}
            onChange={onCalendarStateChange}
          />
        </ConditionalSwitchItem>
        <ConditionalSwitchItem value='time'>
          <TimeWheel />
        </ConditionalSwitchItem>
      </ConditionalSwitch>
      <SelectList
        items={['Date', 'Time']}
        onSelect={index => setInputMode(index === 0 ? 'date' : 'time')}
        direction='horizontal'
      />
    </div>
  )
}
