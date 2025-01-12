import { Text, TextValue } from '@components/Text'
import { Icon, IconName } from '@components/Icon'
import { useTheme } from '@themes/index'
import { CSSProperties } from 'react'

export type ButtonCallback = () => void

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface ButtonProps {
  label?: TextValue
  icon?: IconName
  size?: ButtonSize
  onPress?: ButtonCallback
  style?: CSSProperties
  disabled?: boolean
}

export function Button(props: ButtonProps) {
  const style = _getStyle(props)

  function onPress() {
    if (props.disabled) return

    props.onPress?.()
  }

  return (
    <div onClick={onPress} style={style}>
      <Icon name={props.icon} size='md' color={style.color} />
      <Text value={props.label} category='h6' />
    </div>
  )
}

const _getStyle = (props: ButtonProps): CSSProperties => {
  const theme = useTheme()

  let style: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: theme.selectedListItemColor,
    cursor: 'pointer',
  }

  if (props.size == 'sm') {
    style.minHeight = 30
    style.minWidth = 70
    style.paddingInline = 15
    style.paddingBlock = 5
  } else {
    style.minHeight = 50
    style.minWidth = 150
  }

  if (props.disabled) {
    const disabledColor = 'grey'

    style.color = disabledColor
    style.backgroundColor = 'transparent'
    style.borderColor = disabledColor
  }

  return { ...style, ...props.style }
}
