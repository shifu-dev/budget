import { Button } from '@components/Button'
import { useClient } from '@client/ClientProvider'
import { useParams } from 'react-router'
import { TransactionEditView } from '@components/TransactionEditView'

export function TransactionEditPage() {
  const client = useClient()
  const params = useParams()

  const transactionResult = client.getTransaction({ id: params.id as string })
  if (!transactionResult) throw 0

  const transaction = transactionResult

  function onCancel() {}
  function onAccept() {}

  return (
    <div
      id='root'
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
        <Button label='Cancel' size='md' onPress={onCancel} />
        <Button label='Accept' size='md' onPress={onAccept} />
      </div>
      <TransactionEditView transaction={transaction} />
    </div>
  )
}
