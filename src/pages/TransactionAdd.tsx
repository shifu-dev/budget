import { Button } from '@components/Button'
import { useClient } from '@client/ClientProvider'
import { useNavigate } from 'react-router'
import { TransactionEditView } from '@components/TransactionEditView'
import { Transaction } from '@client/Transaction'
import { useState } from 'react'

export function TransactionCreatePage() {
  const navigate = useNavigate()
  const client = useClient()

  const initTransaction: Transaction = {
    id: '',
    title: '',
    amount: 0,
    datetime: new Date(),
    category: '',
    tags: [],
    notes: '',
  }
  const [transaction, setTransaction] = useState(initTransaction)

  function onCancel() {
    navigate(-1)
  }

  function onAccept() {
    client.addTransaction(transaction)
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
