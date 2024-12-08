/** @jsxImportSource @emotion/react */

import { CSSProperties, JSX } from 'react'
import { useTheme } from '@themes/index'
import { Icon, IconName } from '@components/Icon'
import { css } from '@emotion/react'

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
      css={css`
        display: flex;
        align-items: center;
        flex-direction: row;
        border: solid;
        border-radius: 25px;
        border-width: 0px;
        background-color: ${theme.cardColor};
        padding: 10px;
        min-height: 70px;
        transition: 0.15s;
        &:hover {
          background-color: white;
        }
        &:active {
          background-color: red;
        }
      `}
      onClick={props.onPress}
    >
      {renderWithIcon({ content: props.children, icon: props.leftIcon })}
    </div>
  )
}
