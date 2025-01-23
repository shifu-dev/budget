import { Children, isValidElement, ReactNode } from 'react'

export interface ConditionalSwitchItemProps {
  value: string
  children: ReactNode
}

export function ConditionalSwitchItem(props: ConditionalSwitchItemProps) {
  return props.children
}

export interface ConditionalSwitchProps {
  condition: string
  children: ReactNode
}

export function ConditionalSwitch(props: ConditionalSwitchProps) {
  const { condition, children } = props

  const matchedChild = Children.toArray(children).find(
    child =>
      isValidElement(child) &&
      (child.props as ConditionalSwitchItemProps).value === condition,
  )

  return matchedChild
}
