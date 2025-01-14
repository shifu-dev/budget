import { useState } from 'react'
import { useNavigate } from 'react-router'
import { List } from '@components/List'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { Card } from '@components/Card'

export interface Transaction {
  id: string
  title: string
  amount: number
  time: Date
  notes: string
}

export function TransactionsPage() {
  const navigate = useNavigate()
  const [transactions] = useState<Transaction[]>(getDummyTransactions(100))

  const onBack = () => {}
  const onAdd = () => {
    navigate('/transaction-edit')
  }

  const renderTransaction = (transaction: Transaction) => {
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
        <Button startIcon='back' onPress={onBack} />
        <Button startIcon='add' onPress={onAdd} />
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

function getDummyTransactions(count: number): Transaction[] {
  const dummyTransaction: Transaction = {
    id: '',
    title: '',
    time: new Date(),
    amount: 100,
    notes: '',
  }

  return Array(count)
    .fill(dummyTransaction)
    .map((_, index) => ({
      ...dummyTransaction,
      id: `txn-${index + 1}`,
      title: `Transaction ${index + 1}`,
      time: new Date(Date.now() + index * 1000 * 60 * 60 * 24),
    }))
}
