import { useState } from 'react'
import { Card, CardProps } from '@components/Card'
import { SelectList, SelectListProps } from '@components/SelectList'
import { Text } from '@components/Text'
import { Conditional } from '@components/Conditional'

export interface SelectListCardProps extends CardProps {
  listProps?: SelectListProps
}

export function SelectListCard(props: SelectListCardProps) {
  const listProps = props.listProps
  const selectedItems =
    listProps && listProps?.items && listProps?.selected
      ? listProps.selected.map(itemIndex => listProps.items?.[itemIndex] ?? '')
      : []

  const [isListOpen, setIsListOpen] = useState(false)

  return (
    <Card
      style={{
        paddingBlock: 0,
        flexDirection: 'column',
      }}
    >
      <Card
        {...props}
        onPress={() => setIsListOpen(!isListOpen)}
        style={{
          width: '100%',
        }}
      >
        <Text value={selectedItems} category='h6' />
      </Card>
      <Conditional value={isListOpen}>
        <SelectList {...props.listProps} />
      </Conditional>
    </Card>
  )
}
