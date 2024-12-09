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
        backgroundColor: theme.backgroundColor,
        height: '100vh',
      }}
    >
      {props.children}
    </div>
  )
}
