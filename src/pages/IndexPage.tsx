import { Text } from '@components/Text'
import { useNavigate } from 'react-router'

export function IndexPage() {
  const navigate = useNavigate()
  navigate('/home')

  return <Text value='Loading...' />
}
