import { ReactNode } from 'react'

export interface IterateProps {
  range?: any[]
  element: (value: any, index: number) => ReactNode
}

export function Iterate(props: IterateProps) {
  return props.range?.map((value: any, index: number) =>
    props.element(value, index),
  )
}
