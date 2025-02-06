import { useState } from 'react'
import { TextInputCard } from '@components/TextInputCard'
import { TextInput } from '@components/TextInput'
import { DateTimeInputCard } from '@components/DateTimeInputCard'
import { SelectListCard } from '@components/SelectListCard'
import { CostInputCard } from '@components/CostInputCard'
import { Transaction } from '@client/Transaction'

export interface TransactionEditViewProps {
  transaction: Transaction
}

export function TransactionEditView(props: TransactionEditViewProps) {
  const { transaction } = props
  const [title, setTitle] = useState(transaction.title)
  const [amount, setAmount] = useState(transaction.amount)
  const [datetime, setDatetime] = useState(transaction.time)
  const [notes, setNotes] = useState(transaction.notes)
  const [categoryIndex, setCategoryIndex] = useState<number>(0)
  const [selectedTagIndices, setSelectedTagIndices] = useState<number[]>([])

  const categories = ['Category 1', 'Category 2', 'Category 3']
  const tags = ['Tag 1', 'Tag 2', 'Tag 3']

  function onCategorySelect(index: number) {
    setCategoryIndex(index)
  }

  function onTagSelect(index: number) {
    const newIndices = [...selectedTagIndices, index].sort()
    setSelectedTagIndices(newIndices)
  }

  function onTagUnselect(index: number) {
    const newIndices = selectedTagIndices.filter(
      selectedTagIndex => selectedTagIndex !== index,
    )
    setSelectedTagIndices(newIndices)
  }

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
        <TextInput
          value={title}
          onChange={setTitle}
          category='h1'
          align='center'
        />
      </div>

      <CostInputCard
        key='amount'
        variant='long-medium'
        inputProps={{
          value: amount.toString(),
          onChange: value => setAmount(parseInt(value)),
        }}
      />
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
          selected: [categoryIndex],
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
  )
}
