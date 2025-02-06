import { Button } from '@components/Button'
import { useClient } from '@client/ClientProvider'
import { useNavigate, useParams } from 'react-router'
import { TransactionEditView } from '@components/TransactionEditView'
import { Transaction } from '@client/Transaction'
import { useState } from 'react'

export function TransactionEditPage() {
  const navigate = useNavigate()
  const client = useClient()
  const params = useParams()

  const transactionResult = client.getTransaction({ id: params.id as string })
  if (!transactionResult) throw 0

  const [transaction, setTransaction] = useState(transactionResult)

  function onCancel() {
    navigate(-1)
  }

  function onAccept() {
    client.updateTransaction(transaction)
    navigate(-1)
  }

  function onChange(changes: Partial<Transaction>) {
    return setTransaction({ ...transaction, ...changes })
  }

  return (
    <div
      id='transaction-edit-page'
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
      <TransactionEditView transaction={transaction} onChange={onChange} />
    </div>
  )
}
