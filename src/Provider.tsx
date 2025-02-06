import { ReactNode } from 'react'
import { ThemeProvider } from '@themes/index'
import { TextInputModalProvider } from '@components/TextInputModal'
import { ClientProvider } from '@client/ClientProvider'

export function Provider(props: { children: ReactNode }) {
  return (
    <ClientProvider>
      <ThemeProvider>
        <TextInputModalProvider>{props.children}</TextInputModalProvider>
      </ThemeProvider>
    </ClientProvider>
  )
}
