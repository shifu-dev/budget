import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
  NavigationType,
} from 'react-router'
import { HomePage } from '@pages/Home'
import { TransactionPage } from '@pages/Transaction'
import { TransactionEditPage } from '@pages/TransactionEdit'
import { TransactionsPage } from '@pages/Transactions'
import { Background } from '@components/Background'
import { NotFoundPage } from '@pages/NotFound'
import { TransactionCreatePage } from '@pages/TransactionAdd'
import { IndexPage } from '@pages/IndexPage'
import { TabLayout } from '@layouts/TabLayout'
import { useTheme } from './themes'
import constants from '@constants'

function animatePage(page: ReactNode) {
  const theme = useTheme()
  const navigationType = useNavigationType()
  const isPushNavigation = navigationType === NavigationType.Push

  return (
    <motion.div
      style={{
        height: '100%',
      }}
      className='animated-page'
      variants={{
        enter: {
          opacity: 0,
          scale: isPushNavigation
            ? 1 - constants.pageTransitionScaleFactor
            : 1 + constants.pageTransitionScaleFactor,
        },
        idle: {
          opacity: 1,
          scale: 1,
        },
        exit: props => {
          return {
            opacity: 0,
            scale: props.isPushNavigation
              ? 1 + constants.pageTransitionScaleFactor
              : 1 - constants.pageTransitionScaleFactor,
          }
        },
      }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: constants.pageTransitionAnimDuration / theme.animSpeed,
      }}
      initial='enter'
      animate='idle'
      exit='exit'
    >
      {page}
    </motion.div>
  )
}

export function AnimatedRoutes() {
  const AnimatedHomePage = animatePage(<HomePage />)
  const AnimatedTransactionsPage = animatePage(<TransactionsPage />)
  const AnimatedTransactionPage = animatePage(<TransactionPage />)
  const AnimatedTransactionAddPage = animatePage(<TransactionCreatePage />)
  const AnimatedTransactionEditPage = animatePage(<TransactionEditPage />)
  const location = useLocation()
  const navigationType = useNavigationType()
  const isPushNavigation = navigationType === NavigationType.Push

  return (
    <AnimatePresence
      mode='wait'
      custom={{
        isPushNavigation: isPushNavigation,
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route element={<Background />}>
          <Route path='/' element={<IndexPage />} />
          <Route element={<TabLayout />}>
            <Route path='/home' element={AnimatedHomePage} />
            <Route path='/transactions' element={AnimatedTransactionsPage} />
          </Route>
          <Route path='/transaction/:id' element={AnimatedTransactionPage} />
          <Route
            path='/transaction/edit/:id'
            element={AnimatedTransactionEditPage}
          />
          <Route path='/transaction/add' element={AnimatedTransactionAddPage} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export function Router() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
