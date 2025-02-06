import { useState } from 'react'
import { Text } from '@components/Text'
import { Card, CardProps } from '@components/Card'
import { DatetimeInput, DatetimeInputProps } from '@components/DatetimeInput'
import { Conditional } from '@components/Conditional'

export interface DatetimeInputCardProps extends CardProps {
  inputProps: DatetimeInputProps
}

export function DatetimeInputCard(props: DatetimeInputCardProps) {
  const [isInputMode, setIsInputMode] = useState(false)
  const [datetime, setDatetime] = useState(new Date())
  const timeString = datetime.toLocaleDateString()
  const userOnChange = props.inputProps.onChange

  function onViewPress() {
    setIsInputMode(!isInputMode)
  }

  function onChange(value: Date) {
    setDatetime(value)
    userOnChange?.(value)
  }

  return (
    <Card
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBlock: 0,
        gap: 10,
        ...props,
      }}
    >
      <Card
        leftIcon='clock'
        rightIcon={isInputMode ? 'arrow-up' : 'arrow-down'}
        onPress={onViewPress}
        style={{
          width: '100%',
        }}
      >
        <Text value={timeString} category='h5' />
      </Card>
      <Conditional value={isInputMode}>
        <DatetimeInput {...props.inputProps} onChange={onChange} />
      </Conditional>
    </Card>
  )
}
