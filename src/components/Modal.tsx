import { CSSProperties, JSX, MouseEvent } from 'react'
import { useTheme } from '@themes/index'

export type ModalCloseRequestCallback = () => any

export interface ModalProps {
  isOpen?: boolean
  onCloseRequest?: ModalCloseRequestCallback
  closeOnOverlay?: boolean
  overlayStyle?: CSSProperties
  containerStyle?: CSSProperties
  children?: JSX.Element | JSX.Element[]
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

  const onContainerPress = (event: MouseEvent) => {
    event.stopPropagation()
  }

  if (!isOpen) return

  return (
    <div
      id='modal-overlay'
      onClick={onOverlayPress}
      style={{
        ...{
          position: 'fixed',
          height: '100%',
          width: '100%',
          background: theme.modalOverlayColor,
          transition: `${theme.modalOpenTransitionSpeed}`,
        },
        ...props.overlayStyle,
      }}
    >
      <div
        id='modal-container'
        onClick={onContainerPress}
        style={props.containerStyle}
      >
        {props.children}
      </div>
    </div>
  )
}
