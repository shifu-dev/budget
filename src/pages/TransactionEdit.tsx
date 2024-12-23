import { useState } from 'react'
import { Transaction } from '@pages/Transactions'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { TimeCard } from '@components/TimeCard'
import { CostCard } from '@components/CostCard'
import { TextCard } from '@components/TextCard'
import { useTextInputModal } from '@components/TextInputModal'

export function TransactionEditPage() {
  const transaction: Transaction = {
    id: 'w7693284wioewgeoufgsu',
    title: 'Title',
    amount: 236,
    time: new Date(),
    notes: 'Hi there, how is it going?',
  }

  const [title, setTitle] = useState(transaction.title)
  const [amount, setAmount] = useState(transaction.amount)
  const [time, setTime] = useState(transaction.time)
  const [notes, setNotes] = useState(transaction.notes)

  const textInputModal = useTextInputModal()

  const onCancel = () => {}
  const onAccept = () => {}

  const onCostPress = () => {}
  const onTimePress = () => {}

  const onNotesPress = () => {
    textInputModal?.open({
      value: notes,
      onAccept: value => setNotes(value),
    })
  }

  return (
    <div
      id='root'
      style={{
        padding: 10,
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
        <Button icon='cancel' size='sm' onPress={onCancel} />
        <Button icon='accept' size='sm' onPress={onAccept} />
      </div>
      <div
        id='content'
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 5,
          gap: 10,
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
          <Text value={title} category='h1' />
        </div>

        <CostCard
          key='amount'
          variant='long-medium'
          value={amount}
          onPress={onCostPress}
        />
        <TimeCard
          key='time'
          variant='long-medium'
          value={time}
          onPress={onTimePress}
        />
        <TextCard
          key='notes'
          variant='long-flex'
          value={notes}
          onPress={onNotesPress}
        />
      </div>
    </div>
  )
}
