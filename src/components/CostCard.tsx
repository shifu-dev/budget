import { Text } from '@components/Text'
import { Card, CardProps } from '@components/Card'

export interface CostCardProps extends CardProps {
  value: number
}

export function CostCard(props: CostCardProps) {
  const costString = props.value.toString()

  return (
    <Card leftIcon='currency-rupee' {...props}>
      {<Text value={costString} category='h4' />}
    </Card>
  )
}
