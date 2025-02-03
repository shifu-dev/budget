import { ReactNode } from 'react'

export interface ConditionalProps {
  value: any
  children?: ReactNode
}

export function Conditional(props: ConditionalProps) {
  if (!props.value) return

  return props.children
}
