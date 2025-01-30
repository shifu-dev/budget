import { CSSProperties, JSX, useRef } from 'react'
import { Text, isTextValue } from '@components/Text'
import { Iterate } from '@components/Iterate'
import { Pressable } from './Pressable'

export type ListScrollPosition = 'nearest' | 'start' | 'center' | 'end'

export type ListScrollBehavior = 'auto' | 'instant' | 'smooth'

export interface ListProps<T> {
  items?: T[]
  itemRenderer?: (item: T, index: number) => JSX.Element
  direction?: 'horizontal' | 'vertical'
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

export function List<T>(props: ListProps<T>) {
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
  const startPadding = 0
  const endPadding = 0

  function Item(args: { index: number }) {
    const { index } = args
    const item = props.items?.[index]
    if (!item) return

    if (props.itemRenderer) return props.itemRenderer(item, index)

    if (isTextValue(item))
      return <Text value={item} align='center' category='h5' />

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
        display: 'flex',
        flexDirection:
          (props.direction ?? defaultDirection) === 'vertical'
            ? 'column'
            : 'row',
        height: '100%',
        width: '100%',
        overflow: 'scroll',
        scrollbarWidth: 'none',
        scrollSnapType: `${scrollSnapAxis} mandatory`,
        scrollSnapStop: scrollSnapStop,
        gap: 10,
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
      <Iterate
        range={props.items}
        element={(_, index) => (
          <Pressable
            onPress={() => onItemClick(index)}
            animateOnHover={false}
            animateOnPress={false}
            propagateEvents
            style={{
              scrollSnapAlign: scrollSnapAlign,
            }}
          >
            <Item index={index} />
          </Pressable>
        )}
      />
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
