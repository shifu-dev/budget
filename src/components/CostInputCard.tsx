import { Card, CardProps } from '@components/Card'
import { TextInput, TextInputProps } from './TextInput'

export interface CostInputCardProps extends CardProps {
  inputProps?: TextInputProps
}

export function CostInputCard(props: CostInputCardProps) {
  return (
    <Card {...props} leftIcon='currency-rupee'>
      <TextInput placeholder='Amount' category='h4' {...props.inputProps} />
    </Card>
  )
}
