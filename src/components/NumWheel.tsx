import { CSSProperties } from 'react'
import { Wheel } from '@components/Wheel'
import utils from '@utils'

export interface NumWheelProps {
  to: number
  from?: number
  value: number
  onSelect?: (value: number) => void
  style?: CSSProperties
  coverStyle?: CSSProperties
}

export const NumWheel = (props: NumWheelProps) => {
  const from = props.from ?? 0
  const numStrings = utils.generateNumList(from, props.to)

  const onSelect = (index: number) => {
    if (!props.onSelect) return

    const year = from + index

    props.onSelect(year)
  }

  return (
    <Wheel
      selected={props.value}
      items={numStrings}
      onSelect={onSelect}
      style={props.style}
      coverStyle={props.coverStyle}
    />
  )
}
