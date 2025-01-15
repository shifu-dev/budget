import { JSX, createContext, useContext, useEffect, useState } from 'react'
import { Modal, ModalProps } from '@components/Modal'
import { Button } from '@components/Button'
import { Card } from '@components/Card'
import { TextInput } from '@components/TextInput'
import { useTheme } from '@themes/index'

export type TextInputModalCancelCallback = () => void
export type TextInputModalAcceptCallback = (value: string) => void

export interface TextInputModalProps extends ModalProps {
  value?: string
  onCancel?: TextInputModalCancelCallback
  onAccept?: TextInputModalAcceptCallback
}

export function TextInputModal(props: TextInputModalProps) {
  const theme = useTheme()
  const [value, setValue] = useState(props.value ?? '')

  useEffect(() => {
    if (props.isOpen) setValue(props.value ?? '')
    else setValue('')
  }, [props.isOpen])

  function onCancel() {
    props.onCancel?.()
  }

  function onAccept() {
    props.onAccept?.(value)
  }

  function onChange(value: string) {
    setValue(value)
  }

  return (
    <Modal
      overlayStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      containerStyle={{
        width: '80%',
        maxWidth: 600,
        marginBottom: 20,
      }}
      {...props}
    >
      <Card>
        <TextInput
          value={value}
          onChange={onChange}
          style={{
            backgroundColor: theme.colors.card,
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button label='Cancel' onPress={onCancel} />
          <Button label='Accept' onPress={onAccept} />
        </div>
      </Card>
    </Modal>
  )
}

export interface TextInputModalProviderProps {
  children?: JSX.Element | JSX.Element[]
}

export interface TextInputHandle {
  open: (props: {
    value: string
    onAccept: TextInputModalAcceptCallback
  }) => void
}

export const TextInputContext = createContext<TextInputHandle | null>(null)

export function TextInputModalProvider(props: TextInputModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [userOnAccept, setUserOnAccept] = useState<
    TextInputModalAcceptCallback | undefined
  >()

  const onAccept = (value: string) => {
    setIsOpen(false)
    setValue('')

    userOnAccept?.(value)
  }

  const onCancel = () => {
    setIsOpen(false)
    setValue('')
  }

  const onCloseRequest = () => {
    setIsOpen(false)
    setValue('')
  }

  const handle: TextInputHandle = {
    open: (props: {
      value: string
      onAccept: TextInputModalAcceptCallback
    }) => {
      setIsOpen(true)
      setValue(props.value)

      // wrapping inside function to avoid immediate invocation.
      setUserOnAccept(() => props.onAccept)
    },
  }

  return (
    <TextInputContext.Provider value={handle}>
      <TextInputModal
        isOpen={isOpen}
        value={value}
        onCancel={onCancel}
        onAccept={value => onAccept(value)}
        onCloseRequest={onCloseRequest}
      />
      {props.children}
    </TextInputContext.Provider>
  )
}

export function useTextInputModal() {
  return useContext(TextInputContext)
}
