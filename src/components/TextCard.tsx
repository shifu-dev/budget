import { Text } from '@components/Text'
import { Card, CardProps } from '@components/Card'

export interface TextCardProps extends CardProps {
  value: string
}

export function TextCard(props: TextCardProps) {
  const text = props.value

  return (
    <Card leftIcon='notes'>
      {<Text value={text} category='h5' />}
    </Card>
  )
}
