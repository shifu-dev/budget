import { useTheme } from '@themes/index'
import { Text } from '@components/Text'

export interface CalendarErrorProps {
  msg?: string
}

export function CalendarError(props: CalendarErrorProps) {
  const theme = useTheme()

  return (
    <div>
      <div
        key='top-bar'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.card,
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text value='Calendar' category='h3' align='center' />
      </div>
      <div
        key='grid'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: 20,
        }}
      >
        <Text value={props.msg} category='h5' align='center' />
      </div>
    </div>
  )
}
