import { CSSProperties } from 'react'
import { Text, TextValue } from '@components/Text'
import { Icon, IconName } from '@components/Icon'
import { useTheme } from '@themes/index'
import { Pressable } from './Pressable'
import { colors } from '@themes/Colors'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export type ButtonVariant = 'solid' | 'light' | 'ghost'

export interface ButtonProps {
  label?: TextValue
  icon?: IconName
  endIcon?: IconName
  size?: ButtonSize
  radius?: ButtonRadius
  variant?: ButtonVariant
  color?: ButtonColor
  disabled?: boolean
  onPress?: () => void
}

export function Button(props: ButtonProps) {
  const style = _getStyle(props)

  return (
    <Pressable onPress={props.onPress} disabled={props.disabled} style={style}>
      <Icon name={props.icon} size={props.size} color={style.color} />
      <Text value={props.label} category='h6' />
      <Icon name={props.endIcon} size={props.size} color={style.color} />
    </Pressable>
  )
}

function _getStyle(props: ButtonProps): CSSProperties {
  const theme = useTheme()
  const color = props.disabled ? colors.matteBlack : theme.colors.text

  let style: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 2,
  }

  // Size
  switch (props.size ?? 'md') {
    case 'sm':
      style.height = 30
      style.width = 70
      style.paddingInline = 5
      style.paddingBlock = 5
      break

    case 'md':
      style.height = 40
      style.width = 150
      style.paddingInline = 10
      style.paddingBlock = 10
      break

    case 'lg':
      style.height = 50
      style.width = 200
      style.paddingInline = 10
      style.paddingBlock = 10
      break
  }

  // Variant
  switch (props.variant ?? 'solid') {
    case 'light':
      style.borderColor = colors.transparent
      style.backgroundColor = colors.transparent
      break

    case 'solid':
      style.borderColor = theme.colors.card
      style.backgroundColor = theme.colors.card
      break

    case 'ghost':
      style.borderColor = color
      style.backgroundColor = colors.transparent
      break
  }

  // Radius
  switch (props.radius ?? 'full') {
    case 'none':
      style.borderRadius = 0
      break
    case 'sm':
      style.borderRadius = 10
      break
    case 'md':
      style.borderRadius = 20
      break
    case 'lg':
      style.borderRadius = 30
      break
    case 'full':
      style.borderRadius = 100
      break
  }

  return style
}
