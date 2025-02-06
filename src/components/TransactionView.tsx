import { Text } from '@components/Text'
import { CostCard } from '@components/CostCard'
import { TimeCard } from '@components/TimeCard'
import { TextCard } from '@components/TextCard'
import { Transaction } from '@client/Transaction'

export interface TransactionViewProps {
  transaction: Transaction
}

export function TransactionView(props: TransactionViewProps) {
  const { transaction } = props

  return (
    <div
      id='content'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
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

      <CostCard key='amount' variant='long-medium' value={transaction.amount} />
      <TimeCard key='datetime' variant='long-medium' value={transaction.time} />
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
  )
}
