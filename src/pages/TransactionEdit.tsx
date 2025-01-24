import { useState } from 'react'
import { Transaction } from '@pages/Transactions'
import { Button } from '@components/Button'
import { CostCard } from '@components/CostCard'
import { TextInputCard } from '@components/TextInputCard'
import { TextInput } from '@components/TextInput'
import { DateTimeInputCard } from '@components/DateTimeInputCard'
import { SelectListCard } from '@components/SelectListCard'

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
  const [datetime, setDatetime] = useState(transaction.time)
  const [notes, setNotes] = useState(transaction.notes)
  const [categoryIndex, setCategoryIndex] = useState<number>()
  const [selectedTagIndices, setSelectedTagIndices] = useState<number[]>([])

  const categories = ['Category 1', 'Category 2', 'Category 3']
  const tags = ['Tag 1', 'Tag 2', 'Tag 3']

  function onCategorySelect(index: number) {
    setCategoryIndex(index)
  }

  function onTagSelect(index: number) {
    setSelectedTagIndices([...selectedTagIndices, index])
  }

  function onTagUnselect(index: number) {
    const newIndices = selectedTagIndices.filter(
      selectedTagIndex => selectedTagIndex !== index,
    )
    setSelectedTagIndices(newIndices)
  }

  function onCancel() {}
  function onAccept() {}

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

        <CostCard value={amount} key='amount' variant='long-medium' />
        <DateTimeInputCard
          key='datetime'
          variant='long-medium'
          inputProps={{
            value: datetime,
            onChange: setDatetime,
          }}
        />
        <SelectListCard
          key='category'
          variant='long-medium'
          leftIcon='category'
          listProps={{
            items: categories,
            selected: categoryIndex ? [categoryIndex] : [],
            onSelect: onCategorySelect,
          }}
        />
        <SelectListCard
          key='tags'
          variant='long-medium'
          leftIcon='tag'
          listProps={{
            items: tags,
            selected: selectedTagIndices,
            onSelect: onTagSelect,
            onUnselect: onTagUnselect,
          }}
        />
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
