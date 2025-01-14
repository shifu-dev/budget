import { CSSProperties, JSX } from 'react'
import { useTheme } from '@themes/index'
import { Icon, IconName } from '@components/Icon'
import { Conditional } from '@components/Conditional'

export type CardVariant = 'long-medium' | 'long-flex'

export interface CardProps {
  children?: JSX.Element | JSX.Element[]
  onPress?: () => void
  leftIcon?: IconName
  rightIcon?: IconName
  variant?: CardVariant
  style?: CSSProperties | undefined
}

export function Card(props: CardProps) {
  const theme = useTheme()
  const isPressable = props.onPress !== undefined

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        border: 'solid',
        borderRadius: '25px',
        borderWidth: '0px',
        backgroundColor: theme.cardColor,
        padding: '10px',
        minHeight: '70px',
        transition: '0.15s',
        cursor: isPressable ? 'pointer' : undefined,
        ...props.style,
      }}
      onClick={props.onPress}
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
    </div>
  )
}
