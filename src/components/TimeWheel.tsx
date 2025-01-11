import { NumWheel } from '@components/NumWheel'
import { Text } from '@components/Text'

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

  function CustomWheel(args: {
    show: boolean
    title: string
    value: any
    to: number
    onSelect: any
  }) {
    const { show, title, value, to, onSelect } = args

    if (!show) return

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 10,
        }}
      >
        <Text value={title} category='h5' />
        <NumWheel
          value={value}
          to={to}
          onSelect={onSelect}
          style={{
            height: 200,
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <CustomWheel
        title='Hour'
        show={showHour}
        value={hour}
        to={23}
        onSelect={props.onHourSelect}
      />
      <CustomWheel
        title='Minute'
        show={showMinute}
        value={minute}
        to={59}
        onSelect={props.onMinuteSelect}
      />
      <CustomWheel
        title='Second'
        show={showSecond}
        value={second}
        to={59}
        onSelect={props.onSecondSelect}
      />
    </div>
  )
}
