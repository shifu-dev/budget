import { JSX } from 'react'
import { useTheme } from '@themes/index'

export interface BackgroundProps {
  children?: JSX.Element | JSX.Element[]
}

export function Background(props: BackgroundProps) {
  const theme = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.background,
        height: '100vh',
        overflow: 'scroll',
        scrollbarWidth: 'none',
      }}
    >
      {props.children}
    </div>
  )
}
