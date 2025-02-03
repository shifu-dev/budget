import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { CostCard } from '@components/CostCard'
import { TimeCard } from '@components/TimeCard'
import { TextCard } from '@components/TextCard'
import { useClient } from '@client/ClientProvider'

export function TransactionPage() {
  const navigate = useNavigate()
  const client = useClient()
  const params = useParams()
  const transactionResult = client.getTransaction({ id: params.id as string })
  if (!transactionResult) throw 0

  const transaction = transactionResult

  function onBack() {
    navigate('/transactions')
  }

  function onEdit() {
    navigate('/transaction-edit/' + transaction.id)
  }

  return (
    <div
      id='root'
      style={{
        padding: 10,
      }}
    >
      <div
        id='top-bar'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: 60,
        }}
      >
        <Button startIcon='back' size='sm' onPress={onBack} />
        <Button startIcon='edit' size='sm' onPress={onEdit} />
      </div>
      <div
        id='content'
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 5,
          gap: 10,
        }}
      >
        <div
          id='title'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 250,
          }}
        >
          <Text value={transaction.title} category='h1' align='center' />
        </div>

        <CostCard
          key='amount'
          variant='long-medium'
          value={transaction.amount}
        />
        <TimeCard
          key='datetime'
          variant='long-medium'
          value={transaction.time}
        />
        <TextCard
          key='category'
          variant='long-medium'
          leftIcon='category'
          value={transaction.category}
        />
        <TextCard
          key='tags'
          variant='long-medium'
          leftIcon='tag'
          value={transaction.tags}
        />
        <TextCard key='notes' variant='long-flex' value={transaction.notes} />
      </div>
    </div>
  )
}
