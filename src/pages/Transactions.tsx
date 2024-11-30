import { useState } from 'react'
import { List } from '@components/List'
import { Text } from '@components/Text'

export interface Transaction {
  id: string
  title: string
  amount: number
  time: Date
  notes: string
}

export function TransactionsPage() {
  const [transactions] = useState<Transaction[]>(getDummyTransactions(100))

  const renderTransaction = (transaction: Transaction) => {
    return (
      <div id='transaction'>
        <Text value={transaction.title} />
        <Text value={transaction.amount} />
        <Text value={transaction.time} />
      </div>
    )
  }

  return (
    <>
      <div
        id='title'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
        }}
      >
        <span>
          <Text value='Transactions' category='h1' />
        </span>
      </div>
      <div id='content'>
        <List items={transactions} itemRenderer={renderTransaction} />
      </div>
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
