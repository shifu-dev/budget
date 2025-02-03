import { useLocation } from 'react-router'
import { Text } from '@components/Text'
import { NavButton } from '@components/NavButton'

export function NotFoundPage() {
  const location = useLocation()
  const url = location.pathname

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: 40,
        gap: 40,
      }}
    >
      <Text
        value={`The specified url '${url}' was not found.`}
        align='center'
        category='h4'
      />
      <NavButton label='Got to Home' to='/home' size='lg' />
    </div>
  )
}
