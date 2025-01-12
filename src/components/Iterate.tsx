import { JSX } from 'react'

export interface IterateProps {
  range?: any[]
  element: (value: any, index: number) => JSX.Element
}

export function Iterate(props: IterateProps) {
  return props.range?.map((value: any, index: number) =>
    props.element(value, index),
  )
}
