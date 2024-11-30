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
      <div
        className='transaction'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 50,
          height: '100%',
          width: '100%',
          padding: 10,
          margin: 5,
          border: 'solid',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <Text value={transaction.amount} category='h3' />
          <Text value={transaction.title} category='h5' />
        </div>
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
