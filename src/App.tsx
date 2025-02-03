import 'normalize.css'
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router'
import { ThemeProvider } from '@themes/index'
import { HomePage } from '@pages/Home'
import { TransactionPage } from '@pages/Transaction'
import { TransactionEditPage } from '@pages/TransactionEdit'
import { TransactionsPage } from '@pages/Transactions'
import { Background } from '@components/Background'
import { TextInputModalProvider } from '@components/TextInputModal'
import { ClientProvider } from '@client/ClientProvider'
import { NotFoundPage } from '@pages/NotFound'
import { RootErrorBoundary } from '@components/RootErrorBoundary'

export default function App() {
  return (
    <RootErrorBoundary>
      <Providers>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Providers>
    </RootErrorBoundary>
  )
}

function Providers({ children }: any) {
  return (
    <ClientProvider>
      <ThemeProvider>
        <TextInputModalProvider>{children}</TextInputModalProvider>
      </ThemeProvider>
    </ClientProvider>
  )
}

function Routes() {
  return (
    <ReactRoutes>
      <Route element={<Background />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/transaction/:id' element={<TransactionPage />} />
        <Route path='/transactions' element={<TransactionsPage />} />
        <Route path='/transaction-edit/:id' element={<TransactionEditPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </ReactRoutes>
  )
}
