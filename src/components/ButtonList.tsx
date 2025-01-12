import { CSSProperties } from 'react'
import { List } from '@components/List'
import { Button, ButtonProps } from '@components/Button'

export type ButtonListDirection = 'vertical' | 'horizontal'

export interface ButtonListProps {
  buttons?: ButtonProps[]
  direction?: ButtonListDirection
  buttonStyle?: CSSProperties
}

export function ButtonList(props: ButtonListProps) {
  function itemRenderer(button: ButtonProps) {
    return <Button style={props.buttonStyle} {...button} />
  }

  return (
    <List
      items={props.buttons}
      itemRenderer={itemRenderer}
      direction={props.direction}
    />
  )
}
