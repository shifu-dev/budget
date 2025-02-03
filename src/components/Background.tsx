import { useTheme } from '@themes/index'
import { Outlet } from 'react-router'

export function Background() {
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
      <Outlet />
    </div>
  )
}
