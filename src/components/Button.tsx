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
  enabled?: boolean
}

export function Button(props: ButtonProps) {
  const style = _getStyle(props)

  function onPress() {
    if (!props.enabled) return

    props.onPress?.()
  }

  return (
    <div onClick={onPress} style={style}>
      <Icon name={props.icon} size='md' color={style.color} />
      <Text value={props.label} category='h5' />
    </div>
  )
}

const _getStyle = (props: ButtonProps): CSSProperties => {
  const theme = useTheme()

  let style: CSSProperties = {
    minHeight: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 25,
    backgroundColor: theme.cardColor,
  }

  if (props.size == 'sm') {
    style.minWidth = 70
    style.borderRadius = '50%'
  } else {
    style.minWidth = 200
  }

  if (props.enabled !== undefined && props.enabled === false) {
    const disabledColor = 'grey'

    style.color = disabledColor
    style.backgroundColor = 'transparent'
    style.borderColor = disabledColor
  }

  return { ...style, ...props.style }
}
