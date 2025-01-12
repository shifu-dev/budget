import { List } from '@components/List'
import { Button, ButtonProps } from '@components/Button'

export type ButtonListDirection = 'vertical' | 'horizontal'

export interface ButtonListProps {
  buttons?: ButtonProps[]
  buttonProps?: ButtonProps
  direction?: ButtonListDirection
}

export function ButtonList(props: ButtonListProps) {
  function itemRenderer(button: ButtonProps) {
    return <Button {...props.buttonProps} {...button} />
  }

  return (
    <List
      items={props.buttons}
      itemRenderer={itemRenderer}
      direction={props.direction}
    />
  )
}
