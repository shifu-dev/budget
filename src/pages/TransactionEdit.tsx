import { useState } from 'react'
import { Transaction } from '@pages/Transactions'
import { Button } from '@components/Button'
import { TimeCard } from '@components/TimeCard'
import { CostCard } from '@components/CostCard'
import { TextInputCard } from '@components/TextInputCard'
import { TextInput } from '@components/TextInput'

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

  const onCancel = () => {}
  const onAccept = () => {}

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
        <Button startIcon='cancel' size='sm' onPress={onCancel} />
        <Button startIcon='accept' size='sm' onPress={onAccept} />
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
          <TextInput
            value={title}
            onChange={setTitle}
            category='h1'
            align='center'
          />
        </div>

        <CostCard key='amount' variant='long-medium' value={amount} />
        <TimeCard key='time' variant='long-medium' value={time} />
        <TextInputCard
          key='notes'
          variant='long-flex'
          onClear={() => setNotes('')}
          inputProps={{
            value: notes,
            onChange: setNotes,
            category: 'text',
          }}
        />
      </div>
    </div>
  )
}
