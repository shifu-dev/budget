import { Text } from '@components/Text'
import { Card, CardProps } from '@components/Card'

export interface TimeCardProps extends CardProps {
  value: Date
}

export function TimeCard(props: TimeCardProps) {
  const timeString = props.value.toLocaleDateString()

  return (
    <Card leftIcon='clock' {...props}>
      {<Text value={timeString} category='h4' />}
    </Card>
  )
}
