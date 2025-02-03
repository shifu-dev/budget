import { ReactNode } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { useTheme } from '@themes/index'

export interface RootErrorBoundaryProps {
  children?: ReactNode
}

export function RootErrorBoundary(props: RootErrorBoundaryProps) {
  function onReload() {
    window.location.href = '/home'
  }

  function FallbackComponent(props: FallbackProps) {
    const theme = useTheme()

    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: theme.colors.background,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: 50,
            gap: 30,
          }}
        >
          <Text
            value='An unknown error occurred. Click the button below to reset.'
            category='h4'
            align='center'
          />
          <Text value={props.error} />
          <Button label='Reload' onPress={onReload} />
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      {props.children}
    </ErrorBoundary>
  )
}
