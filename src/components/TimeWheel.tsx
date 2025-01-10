import { NumWheel } from '@components/NumWheel'

export interface TimeWheelProps {
  hour?: number
  minute?: number
  second?: number

  showHours?: boolean
  showMinutes?: boolean
  showSeconds?: boolean

  onHourSelect?: (value: number) => void
  onMinuteSelect?: (value: number) => void
  onSecondSelect?: (value: number) => void
}

const defaults = {
  hour: 0,
  minute: 0,
  second: 0,
  showHour: true,
  showMinute: true,
  showSecond: false,
}

export const TimeWheel = (props: TimeWheelProps) => {
  const hour = props.hour ?? defaults.hour
  const minute = props.minute ?? defaults.minute
  const second = props.second ?? defaults.second
  const showHour = props.showHours ?? defaults.showHour
  const showMinute = props.showMinutes ?? defaults.showMinute
  const showSecond = props.showSeconds ?? defaults.showSecond

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
      }}
    >
      {showHour && (
        <NumWheel value={hour} to={23} onSelect={props.onHourSelect} />
      )}
      {showMinute && (
        <NumWheel value={minute} to={59} onSelect={props.onMinuteSelect} />
      )}
      {showSecond && (
        <NumWheel value={second} to={59} onSelect={props.onSecondSelect} />
      )}
    </div>
  )
}
