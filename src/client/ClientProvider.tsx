import { createContext, JSX, useContext } from 'react'
import { Client } from '@client/Client'

const ClientContext = createContext<Client | undefined>(undefined)

export interface ClientProviderProps {
  children?: JSX.Element | JSX.Element[]
}

export function ClientProvider(props: ClientProviderProps) {
  const client = new Client()
  return (
    <ClientContext.Provider value={client}>
      {props.children}
    </ClientContext.Provider>
  )
}

export function useClient(): Client {
  const client = useContext(ClientContext)
  if (!client) {
    throw 0
  }

  return client
}
