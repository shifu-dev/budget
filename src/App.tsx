import 'normalize.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ThemeProvider } from '@themes/index'
import { HomePage } from '@pages/Home'
import { TransactionPage } from '@pages/Transaction'
import { TransactionEditPage } from '@pages/TransactionEdit'
import { TransactionsPage } from '@pages/Transactions'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TransactionsPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/transaction' element={<TransactionPage />} />
          <Route path='/transactions' element={<TransactionsPage />} />
          <Route path='/transaction-edit' element={<TransactionEditPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
