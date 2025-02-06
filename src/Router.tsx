import { BrowserRouter, Routes, Route } from 'react-router'
import { HomePage } from '@pages/Home'
import { TransactionPage } from '@pages/Transaction'
import { TransactionEditPage } from '@pages/TransactionEdit'
import { TransactionsPage } from '@pages/Transactions'
import { Background } from '@components/Background'
import { NotFoundPage } from '@pages/NotFound'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Background />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/transactions' element={<TransactionsPage />} />
          <Route path='/transaction/:id' element={<TransactionPage />} />
          <Route
            path='/transaction/:id/edit'
            element={<TransactionEditPage />}
          />
          <Route
            path='/transaction/:id/create'
            element={<TransactionEditPage />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
