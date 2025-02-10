import { ReactNode, CSSProperties } from 'react'
import { motion } from 'motion/react'
import { colors, ColorValue, darken } from '@themes/Colors'

export interface PressableProps {
  onPress?: () => void
  onHover?: () => void
  onFocus?: () => void
  onFocusLost?: () => void
  onHoverStart?: () => void
  onHoverEnd?: () => void
  style?: CSSProperties
  disabled?: boolean
  propagateEvents?: boolean
  animateOnHover?: boolean
  animateOnPress?: boolean
  children?: ReactNode
}

export function Pressable(props: PressableProps) {
  const animateOnHover = props.animateOnHover ?? true
  const animateOnPress = props.animateOnPress ?? true

  const hoverColor: ColorValue = props.style?.backgroundColor
    ? darken(props.style?.backgroundColor)
    : colors.matteBlack

  return (
    <motion.div
      onClick={event => {
        if (!props.propagateEvents) event.stopPropagation()

        if (!props.disabled) props.onPress?.()
      }}
      onFocus={event => {
        if (!props.propagateEvents) event.stopPropagation()

        props.onFocus?.()
      }}
      onBlur={event => {
        if (!props.propagateEvents) event.stopPropagation()

        props.onFocusLost?.()
      }}
      onHoverStart={event => {
        if (!props.propagateEvents) event.stopPropagation()

        props.onHoverStart?.()
      }}
      onHoverEnd={event => {
        if (!props.propagateEvents) event.stopPropagation()

        props.onHoverEnd?.()
      }}
      style={{
        cursor: 'pointer',
        ...props.style,
      }}
      whileHover={
        animateOnHover
          ? {
              backgroundColor: hoverColor,
              borderColor: hoverColor,
              transition: { duration: 0 },
            }
          : undefined
      }
      whileTap={
        animateOnPress
          ? {
              backgroundColor: hoverColor,
              borderColor: hoverColor,
              transition: { duration: 0 },
            }
          : undefined
      }
    >
      {props.children}
    </motion.div>
  )
}
