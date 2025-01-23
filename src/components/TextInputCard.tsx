import { Card, CardProps } from '@components/Card'
import { TextInput, TextInputProps } from '@components/TextInput'
import { Conditional } from './Conditional'
import { Button } from '@components/Button'
import { useState } from 'react'

export interface TextInputCardProps extends CardProps {
  onClear?: () => void
  showClear?: boolean
  inputProps?: TextInputProps
}

export function TextInputCard(props: TextInputCardProps) {
  const userShowClear = props.showClear ?? true
  const [showClear, setShowClear] = useState(false)

  function onFocus() {
    if (userShowClear) setShowClear(true)
  }

  function onFocusLost() {
    if (userShowClear) setShowClear(false)
  }

  return (
    <Card
      leftIcon='notes'
      onFocus={onFocus}
      onFocusLost={onFocusLost}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingRight: 15,
          }}
        >
          <TextInput {...props.inputProps} />
        </div>
        <Conditional value={showClear}>
          <Button startIcon='trash' onPress={props.onClear} size='sm' />
        </Conditional>
      </div>
    </Card>
  )
}
