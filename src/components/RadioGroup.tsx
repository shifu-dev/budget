import { Card } from '@components/Card'
import { Button } from '@components/Button'

export type RadioGroupSelectCallback = (index: number) => void

export interface RadioGroupProps {
  selectedIndex?: number
  items?: string[]
  onSelect?: RadioGroupSelectCallback
}

export function RadioGroup(props: RadioGroupProps) {
  function onPress(index: number) {
    if (index !== props.selectedIndex) props.onSelect?.(index)
  }

  return (
    <Card
      style={{
        padding: 5,
        gap: 5,
      }}
    >
      {props.items?.map((item, index: number) => (
        <Button
          label={item}
          onPress={() => onPress(index)}
          style={{
            width: '100%',
          }}
        />
      ))}
    </Card>
  )
}
