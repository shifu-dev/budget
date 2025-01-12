import { JSX } from 'react'

export interface ConditionalProps {
  value: any
  children?: JSX.Element
}

export function Conditional(props: ConditionalProps) {
  if (!props.value) return

  return props.children
}
