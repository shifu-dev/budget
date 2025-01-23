import { Children, isValidElement, ReactNode } from 'react'

export interface ConditionalSwitchItemProps {
  value?: string
  children: ReactNode
  default?: boolean
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
  let defaultChild: ReactNode | undefined = undefined

  const matchedChild = Children.toArray(children).find(child => {
    if (!isValidElement(child)) return false

    const item = child.props as ConditionalSwitchItemProps
    if (item.value === condition) return true

    if (defaultChild === undefined && item.default) defaultChild = child

    return false
  })

  return matchedChild ?? defaultChild
}
