import { ReactNode } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Text } from '@components/Text'
import { Button } from '@components/Button'

export interface RootErrorBoundaryProps {
  children?: ReactNode
}

export function RootErrorBoundary(props: RootErrorBoundaryProps) {
  function onReload() {
    window.location.href = '/home'
  }

  function FallbackComponent(props: FallbackProps) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 40,
          gap: 40,
          backgroundColor: 'red',
        }}
      >
        <Text value='An unknown error occurred. Click the button below to reset.' />
        <Text value={props.error} />
        <Button label='Reload' onPress={onReload} />
      </div>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      {props.children}
    </ErrorBoundary>
  )
}
