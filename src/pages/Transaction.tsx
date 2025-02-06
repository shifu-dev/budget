import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { Button } from '@components/Button'
import { useClient } from '@client/ClientProvider'
import { TransactionView } from '@components/TransactionView'

export function TransactionPage() {
  const navigate = useNavigate()
  const client = useClient()
  const params = useParams()
  const transactionResult = client.getTransaction({ id: params.id as string })
  if (!transactionResult) throw 0

  const transaction = transactionResult

  function onBack() {
    navigate(-1)
  }

  function onEdit() {
    navigate('/transaction-edit/' + transaction.id)
  }

  return (
    <div
      id='transaction-page'
      style={{
        padding: 15,
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
        <Button label='Back' size='md' onPress={onBack} />
        <Button label='Edit' size='md' onPress={onEdit} />
      </div>
      <TransactionView transaction={transaction} />
    </div>
  )
}
