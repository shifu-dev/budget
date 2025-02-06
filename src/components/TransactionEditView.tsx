import { TextInputCard } from '@components/TextInputCard'
import { TextInput } from '@components/TextInput'
import { DateTimeInputCard } from '@components/DateTimeInputCard'
import { SelectListCard } from '@components/SelectListCard'
import { CostInputCard } from '@components/CostInputCard'
import { Transaction } from '@client/Transaction'
import { useClient } from '@client/ClientProvider'

export interface TransactionEditViewProps {
  transaction: Transaction
  onChange?: (changes: Partial<Transaction>) => void
  availableCategories?: string[]
  availableTags?: string[]
}

export function TransactionEditView(props: TransactionEditViewProps) {
  const { transaction } = props

  const client = useClient()
  const availableCategories =
    props.availableCategories ?? client.getCategories()
  const availableTags = props.availableTags ?? client.getTags()

  const selectedCategoryIndex = availableCategories.findIndex(
    category => category === transaction.category,
  )
  const selectedCategoryIndices =
    selectedCategoryIndex === -1 ? [] : [selectedCategoryIndex]

  const selectedTagIndices = getTagsIndices(transaction.tags)

  function getTagsIndices(tags: string[]): number[] {
    return []
  }

  function onTitleChange(value: string) {
    props.onChange?.({
      title: value,
    })
  }

  function onAmountChange(value: string) {
    props.onChange?.({
      amount: parseInt(value),
    })
  }

  function onDateTimeChange(value: Date) {
    props.onChange?.({
      time: value,
    })
  }

  function onCategoryChange(index: number) {
    const category = availableCategories[index]

    props.onChange?.({
      category: category,
    })
  }

  function onTagSelect(index: number) {
    const newTag = availableTags[index]
    const newTags = [...transaction.tags, newTag].sort()

    props.onChange?.({
      tags: newTags,
    })
  }

  function onTagUnselect(index: number) {
    const tagToRemove = availableTags[index]
    const newTags = transaction.tags.filter(
      selectedTag => selectedTag === tagToRemove,
    )

    props.onChange?.({
      tags: newTags,
    })
  }

  function onNotesChange(value: string) {
    props.onChange?.({
      notes: value,
    })
  }

  function onNotesClear() {
    props.onChange?.({
      notes: '',
    })
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
          value={transaction.title}
          onChange={onTitleChange}
          category='h1'
          align='center'
        />
      </div>

      <CostInputCard
        key='amount'
        variant='long-medium'
        inputProps={{
          value: transaction.amount.toString(),
          onChange: onAmountChange,
        }}
      />
      <DateTimeInputCard
        key='datetime'
        variant='long-medium'
        inputProps={{
          value: transaction.time,
          onChange: onDateTimeChange,
        }}
      />
      <SelectListCard
        key='category'
        variant='long-medium'
        leftIcon='category'
        listProps={{
          items: availableCategories,
          selected: selectedCategoryIndices,
          onSelect: onCategoryChange,
        }}
      />
      <SelectListCard
        key='tags'
        variant='long-medium'
        leftIcon='tag'
        listProps={{
          items: availableTags,
          selected: selectedTagIndices,
          onSelect: onTagSelect,
          onUnselect: onTagUnselect,
        }}
      />
      <TextInputCard
        key='notes'
        variant='long-flex'
        onClear={onNotesClear}
        inputProps={{
          value: transaction.notes,
          onChange: onNotesChange,
          category: 'text',
        }}
      />
    </div>
  )
}
