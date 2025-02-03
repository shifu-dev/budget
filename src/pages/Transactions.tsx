import { useState } from 'react'
import { useNavigate } from 'react-router'
import { List } from '@components/List'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { Card } from '@components/Card'
import { Transaction } from '@client/Transaction'
import { useClient } from '@client/ClientProvider'

export function TransactionsPage() {
  const navigate = useNavigate()
  const client = useClient()

  const [transactions, setTransactions] = useState<Transaction[]>([])

  function onAdd() {
    navigate('/transaction-edit')
  }

  function onLoad() {
    client.loadData()

    setTransactions(client.getTransactions())
  }

  function onSave() {
    client.saveData()
  }

  function onTransactionPress(id: string) {
    navigate(`/transaction/${id}`)
  }

  function renderTransaction(transaction: Transaction) {
    return (
      <div
        style={{
          paddingInline: 10,
          paddingBlock: 4,
        }}
      >
        <Card
          style={{
            justifyContent: 'space-between',
            paddingInline: 30,
          }}
          onPress={() => onTransactionPress(transaction.id)}
        >
          <Text value={transaction.amount} category='h3' />
          <Text value={transaction.title} category='h5' />
        </Card>
      </div>
    )
  }

  return (
    <>
      <div
        id='top-bar'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <Button label='Load' onPress={onLoad} />
        <Button label='Save' onPress={onSave} />
        <Button label='Add' onPress={onAdd} />
      </div>
      <div
        id='title'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 400,
        }}
      >
        <Text value='Transactions' category='h1' />
      </div>
      <List items={transactions} itemRenderer={renderTransaction} />
    </>
  )
}
