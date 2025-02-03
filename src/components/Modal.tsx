import { ReactNode, CSSProperties } from 'react'
import { useTheme } from '@themes/index'
import { Pressable } from './Pressable'

export type ModalCloseRequestCallback = () => any

export interface ModalProps {
  isOpen?: boolean
  onCloseRequest?: ModalCloseRequestCallback
  closeOnOverlay?: boolean
  overlayStyle?: CSSProperties
  containerStyle?: CSSProperties
  children?: ReactNode
}

const defaults = {
  isOpen: false,
  closeOnOverlay: true,
}

export function Modal(props: ModalProps) {
  const theme = useTheme()

  const isOpen = props.isOpen ?? defaults.isOpen
  const closeOnOverlay = props.closeOnOverlay ?? defaults.closeOnOverlay

  const onOverlayPress = () => {
    if (closeOnOverlay) {
      props.onCloseRequest?.()
    }
  }

  if (!isOpen) return

  return (
    <Pressable
      key='modal-overlay'
      onPress={onOverlayPress}
      style={{
        position: 'fixed',
        height: '100%',
        width: '100%',
        background: theme.colors.background,
        transition: `0.4s`,
        ...props.overlayStyle,
      }}
    >
      <Pressable key='modal-container' style={props.containerStyle}>
        {props.children}
      </Pressable>
    </Pressable>
  )
}
