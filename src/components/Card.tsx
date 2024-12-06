import { CSSProperties, JSX } from 'react'
import { useTheme } from '@themes/index'
import { Icon, IconName } from '@components/Icon'

export type CardPressCallback = () => any

export type CardVariant = 'long-medium' | 'long-flex'

export interface CardProps {
  children?: JSX.Element
  onPress?: CardPressCallback
  leftIcon?: IconName
  rightIcon?: IconName
  variant?: CardVariant
  style?: CSSProperties | undefined
}

export function Card(props: CardProps) {
  const theme = useTheme()

  const renderWithIcon = (props: { content: any; icon?: IconName }) => {
    if (!props.icon) {
      return <>{props.content}</>
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <span
          style={{
            marginInline: 30,
          }}
        >
          <Icon name={props.icon} />
        </span>
        {props.content}
      </div>
    )
  }

  return (
    <div
      style={{
        ...{
          display: 'flex',
          flexDirection: 'row',
          border: 'solid',
          borderRadius: 25,
          borderWidth: 0,
          backgroundColor: theme.cardColor,
          padding: 10,
          minHeight: 70,
          alignItems: 'center',
        },
        ...props.style,
      }}
      onClick={props.onPress}
    >
      {renderWithIcon({ content: props.children, icon: props.leftIcon })}
    </div>
  )
}
