import { NavButton } from '@components/NavButton'
import { Text } from '@components/Text'

export function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        gap: 50,
      }}
    >
      <Text value='Hi this is the home page.' />
      <NavButton label='Transactions' to='/transactions' />
    </div>
  )
}
