import 'normalize.css'
import { BrowserRouter, Routes, Route } from 'react-router'
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
      <ClientProvider>
        <ThemeProvider>
          <Background>
            <TextInputModalProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/home' element={<HomePage />} />
                  <Route
                    path='/transaction/:id'
                    element={<TransactionPage />}
                  />
                  <Route path='/transactions' element={<TransactionsPage />} />
                  <Route
                    path='/transaction-edit/:id'
                    element={<TransactionEditPage />}
                  />
                  <Route path='*' element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </TextInputModalProvider>
          </Background>
        </ThemeProvider>
      </ClientProvider>
    </RootErrorBoundary>
  )
}
