import { JSX } from 'react'

export type ItemRenderer<T> = (item: T) => JSX.Element

export type GetItemId<T> = (item: T) => string | number

export interface ListProps<T> {
  items: T[]
  itemRenderer?: ItemRenderer<T>
  getItemId?: GetItemId<T>
}

export function List<T>(props: ListProps<T>) {
  const items = props.items ?? []

  const getItemRenderer = () => {
    if (props.itemRenderer) return props.itemRenderer

    return fallbackItemRenderer
  }

  const defaultGetItemId: GetItemId<T> = (item: T) => {
    return (item as any).id
  }

  const itemRenderer = getItemRenderer()
  const getItemId = props.getItemId ?? defaultGetItemId

  return (
    <>
      <div>
        {items.map((item: T) => (
          <div key={getItemId(item)}>{itemRenderer(item)}</div>
        ))}
      </div>
    </>
  )
}

const fallbackItemRenderer = () => {
  return <>I donno how to render this item</>
}
