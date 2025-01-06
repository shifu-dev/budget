import { CSSProperties, JSX } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { Text } from '@components/Text'

export type ItemRenderer<T> = (item: T) => JSX.Element

export type GetItemId<T> = (item: T) => string | number

export interface ListProps<T> {
  items: T[]
  itemRenderer?: ItemRenderer<T>
  style?: CSSProperties
}

export function List<T>(props: ListProps<T>) {
  const items = props.items ?? []
  const itemCount = items.length

  function Row(index: number) {
    if (props.itemRenderer) return props.itemRenderer(items[index])

    return <Text value='I donno how to render this item' />
  }

  return (
    <Virtuoso
      totalCount={itemCount}
      itemContent={Row}
      style={{
        scrollbarWidth: 'none',
        ...props.style,
      }}
    />
  )
}
