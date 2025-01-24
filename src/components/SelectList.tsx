import { CSSProperties } from 'react'
import { List } from '@components/List'
import { Text, TextValue } from '@components/Text'
import { useTheme } from '@themes/index'

export type SelectListDirection = 'vertical' | 'horizontal'

export interface SelectListProps {
  selected?: number[]
  items?: TextValue[]
  onSelect?: (index: number) => void
  onUnselect?: (index: number) => void
  style?: CSSProperties
  itemStyle?: CSSProperties
  direction?: SelectListDirection
}

export function SelectList(props: SelectListProps) {
  const theme = useTheme()

  function onClick(index: number) {
    if (props.selected && props.selected.includes(index)) {
      props.onUnselect?.(index)
      return
    }

    props.onSelect?.(index)
  }

  function itemRenderer(item: TextValue, index: number) {
    const color =
      props.selected && props.selected.includes(index)
        ? theme.colors.primary
        : undefined

    return (
      <div
        onClick={event => {
          event.stopPropagation()
          onClick(index)
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          backgroundColor: color,
          minWidth: 150,
          minHeight: 50,
          borderRadius: 50,
          ...props.itemStyle,
        }}
      >
        <Text value={item} category='h6' />
      </div>
    )
  }

  return (
    <List
      items={props.items ?? []}
      itemRenderer={itemRenderer}
      direction={props.direction}
      style={props.style}
    />
  )
}
