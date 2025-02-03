import { ReactNode, createContext, useContext } from 'react'
import { Client } from '@client/Client'

const ClientContext = createContext<Client | undefined>(undefined)

export interface ClientProviderProps {
  children?: ReactNode
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
