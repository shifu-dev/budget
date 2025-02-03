import { Card, CardProps } from '@components/Card'
import { Text } from '@components/Text'
import { Transaction } from '@client/Transaction'

export interface TransactionCardProps extends CardProps {
  transaction: Transaction
}

export function TransactionCard(props: TransactionCardProps) {
  const { transaction } = props

  return (
    <Card
      style={{
        justifyContent: 'space-between',
        paddingInline: 30,
      }}
      {...props}
    >
      <Text value={transaction.amount} category='h3' />
      <Text value={transaction.title} category='h5' />
    </Card>
  )
}
