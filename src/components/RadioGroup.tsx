import { CSSProperties } from 'react'
import { Card } from '@components/Card'
import { Text } from '@components/Text'

export type RadioGroupSelectCallback = (index: number) => void

export interface RadioGroupProps {
  selectedIndex?: number
  items?: string[]
  onSelect?: RadioGroupSelectCallback
  style?: CSSProperties
}

export function RadioGroup(props: RadioGroupProps) {
  function onPress(index: number) {
    if (index !== props.selectedIndex) props.onSelect?.(index)
  }

  return (
    <Card
      style={{
        ...{
          padding: 5,
          gap: 5,
        },
        ...props.style,
      }}
    >
      {props.items?.map((item, index: number) => (
        <div
          onClick={() => onPress(index)}
          style={{
            width: '100%',
          }}
        >
          <Text value={item} />
        </div>
      ))}
    </Card>
  )
}
