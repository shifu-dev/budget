import 'normalize.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ThemeProvider } from '@themes/index'
import { HomePage } from '@pages/Home'
import { TransactionPage } from '@pages/Transaction'
import { TransactionEditPage } from '@pages/TransactionEdit'
import { TransactionsPage } from '@pages/Transactions'
import { Background } from '@components/Background'
import { TextInputModalProvider } from '@components/TextInputModal'

function App() {
  return (
    <ThemeProvider>
      <Background>
        <TextInputModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<TransactionEditPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/transaction' element={<TransactionPage />} />
              <Route path='/transactions' element={<TransactionsPage />} />
              <Route
                path='/transaction-edit'
                element={<TransactionEditPage />}
              />
            </Routes>
          </BrowserRouter>
        </TextInputModalProvider>
      </Background>
    </ThemeProvider>
  )
}

export default App
