import { CSSProperties } from 'react'
import { List } from '@components/List'
import { Text, TextValue } from '@components/Text'

export type WheelDirection = 'vertical' | 'horizontal'

export interface WheelProps {
  // index of the selected item
  selected?: number

  // list of items
  items: TextValue[]

  direction?: WheelDirection

  style?: CSSProperties
  coverStyle?: CSSProperties
  onSelect?: (index: number) => void
}

export function Wheel(props: WheelProps) {
  function onSnap(index: number) {
    props.onSelect?.(index)
  }

  function itemRenderer(item: TextValue, index: number) {
    return (
      <div
        key={index}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          cursor: 'pointer',
        }}
      >
        <Text value={item} category='h5' />
      </div>
    )
  }

  function Overlay() {
    const coverHeight = '50%'
    const coverBackground = 'rgba(50, 50, 50, 0.7)'

    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 1,
          borderRadius: 'inherit',
        }}
      >
        <div
          style={{
            height: coverHeight,
            width: '100%',
            backgroundColor: coverBackground,
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
            ...props.coverStyle,
          }}
        />
        <div
          style={{
            height: coverHeight,
            width: '100%',
            backgroundColor: coverBackground,
            borderBottomLeftRadius: 'inherit',
            borderBottomRightRadius: 'inherit',
            ...props.coverStyle,
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        borderRadius: 'inherit',
        ...props.style,
      }}
    >
      <Overlay />
      <List
        items={props.items}
        itemRenderer={itemRenderer}
        direction={props.direction}
        snapItems
        initSnapIndex={props.selected}
        snapPosition='center'
        onSnap={onSnap}
      />
    </div>
  )
}
