import { CSSProperties, JSX, useRef } from 'react'
import { Text, isTextValue } from '@components/Text'

export type ListScrollPosition = 'nearest' | 'start' | 'center' | 'end'

export type ListScrollBehavior = 'auto' | 'instant' | 'smooth'

export interface ListProps {
  items: any[]
  itemRenderer?: (item: any, index: number) => JSX.Element
  direction?: 'horizontal' | 'vertical'
  itemHeight?: number
  initSnapIndex?: number
  snapItems?: boolean
  snapNext?: boolean
  snapPosition?: ListScrollPosition
  snapOnPress?: boolean
  scrollBehavior?: ListScrollBehavior
  snapTerminals?: boolean
  onSnapFuture?: (index: number) => void
  onSnap?: (index: number) => void
  style?: CSSProperties
}

export function List(props: ListProps) {
  const defaultDirection = 'vertical'
  const defaultSnapNext = false
  const defaultSnapPosition: ListScrollPosition = 'start'
  const defaultSnapOnPress = true
  const defaultScrollBehavior = 'smooth'

  const containerRef = useRef<HTMLDivElement | null>(null)

  const scrollSnapAxis =
    (props.direction ?? defaultDirection) === 'vertical' ? 'y' : 'x'

  const scrollSnapStop = props.snapNext ?? defaultSnapNext ? 'always' : 'normal'

  const scrollSnapAlign = props.snapPosition ?? defaultSnapPosition
  const scrollSnapOnPress = props.snapOnPress ?? defaultSnapOnPress
  const scrollBehavior = props.scrollBehavior ?? defaultScrollBehavior
  const items = props.items ?? []
  const startPadding = 0
  const endPadding = 0

  function Item(args: { index: number }) {
    const { index } = args
    const item = items[index]
    if (props.itemRenderer) return props.itemRenderer(item, index)
    if (isTextValue(item))
      return (
        <Text
          value={item}
          align='center'
          category='h5'
          style={{
            height: 60,
          }}
        />
      )

    return <Text value='I donno how to render this item' />
  }

  function onItemClick(index: number) {
    if (!scrollSnapOnPress) return
    if (!containerRef.current) return

    const item = containerRef.current.children[index]
    if (!item) return

    item.scrollIntoView({
      behavior: scrollBehavior,
      block: 'center',
      inline: 'center',
    })
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        overflow: 'scroll',
        scrollbarWidth: 'none',
        scrollSnapType: `${scrollSnapAxis} mandatory`,
        scrollSnapStop: scrollSnapStop,
        ...props.style,
      }}
    >
      <div
        style={{
          height: startPadding,
          width: '100%',
          backgroundColor: 'red',
        }}
      />
      {props.items?.map((_, index: number) => (
        <div
          onClick={() => onItemClick(index)}
          style={{
            scrollSnapAlign: scrollSnapAlign,
            height: props.itemHeight,
          }}
        >
          <Item index={index} />
        </div>
      ))}
      <div
        style={{
          height: endPadding,
          width: '100%',
          backgroundColor: 'red',
        }}
      />
    </div>
  )
}
