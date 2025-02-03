import { ReactNode, CSSProperties } from 'react'
import { useTheme } from '@themes/index'
import { Icon, IconName } from '@components/Icon'
import { Conditional } from '@components/Conditional'
import { Pressable } from '@components/Pressable'

export type CardVariant = 'long-medium' | 'long-flex'

export interface CardProps {
  children?: ReactNode
  onPress?: () => void
  onFocus?: () => void
  onFocusLost?: () => void
  leftIcon?: IconName
  rightIcon?: IconName
  variant?: CardVariant
  style?: CSSProperties | undefined
}

export function Card(props: CardProps) {
  const theme = useTheme()
  const color = theme.colors.card

  return (
    <Pressable
      onPress={props.onPress}
      onFocus={props.onFocus}
      onFocusLost={props.onFocusLost}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        border: 'solid',
        borderRadius: '25px',
        borderWidth: '0px',
        backgroundColor: color,
        padding: '10px',
        minHeight: '70px',
        ...props.style,
      }}
    >
      <Conditional value={props.leftIcon}>
        <div
          id='left-icon'
          style={{
            marginInline: 15,
          }}
        >
          <Icon name={props.leftIcon} size='md' />
        </div>
      </Conditional>
      {props.children}
      <Conditional value={props.rightIcon}>
        <div
          id='right-icon'
          style={{
            alignContent: 'end',
          }}
        >
          <Icon name={props.rightIcon} size='sm' />
        </div>
      </Conditional>
    </Pressable>
  )
}
