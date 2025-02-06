import 'normalize.css'
import './global.css'
import { Provider } from '@provider'
import { Router } from '@router'
import { RootErrorBoundary } from '@components/RootErrorBoundary'

export default function App() {
  return (
    <RootErrorBoundary>
      <Provider>
        <Router />
      </Provider>
    </RootErrorBoundary>
  )
}
