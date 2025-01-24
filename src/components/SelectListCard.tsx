import { useState } from 'react'
import { Card, CardProps } from '@components/Card'
import { SelectList, SelectListProps } from '@components/SelectList'
import { Text, TextValue } from './Text'
import { Modal } from './Modal'

export interface SelectListCardProps extends CardProps {
  listProps?: SelectListProps
}

export function SelectListCard(props: SelectListCardProps) {
  const userOnSelect = props.listProps?.onSelect
  const [selectedItem, setSelectedItem] = useState<TextValue>('')
  const [isListOpen, setIsListOpen] = useState(false)

  function onSelect(index: number) {
    setSelectedItem(props.listProps?.items?.[index] ?? '')
    setIsListOpen(false)
    userOnSelect?.(index)
  }

  return (
    <Card {...props} onPress={() => setIsListOpen(true)}>
      <Text value={selectedItem} category='h6' />
      <Modal isOpen={isListOpen}>
        <SelectList {...props.listProps} onSelect={onSelect} />
      </Modal>
    </Card>
  )
}
