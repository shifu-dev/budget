import MuiList from '@mui/material/List'
import MuiListItem from '@mui/material/ListItem'
import React from 'react'

export type ItemRenderer<T> = (item: T) => React.JSX.Element

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
      <MuiList disablePadding>
        {items.map((item: T) => (
          <MuiListItem key={getItemId(item)} disablePadding>
            {itemRenderer(item)}
          </MuiListItem>
        ))}
      </MuiList>
    </>
  )
}

const fallbackItemRenderer = () => {
  return <>I donno how to render this item</>
}
