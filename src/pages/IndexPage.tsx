import { Text } from '@components/Text'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function IndexPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/home')
  }, [])

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
      <Text value='Loading...' />
    </div>
  )
}
