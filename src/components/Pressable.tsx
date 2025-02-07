import { ReactNode, CSSProperties } from 'react'
import { motion } from 'motion/react'
import { ColorValue, darken } from '@themes/Colors'
import { useTheme } from '@themes/index'

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
  const theme = useTheme()
  const animateOnHover = props.animateOnHover ?? true
  const animateOnPress = props.animateOnPress ?? true
  const pressScale = 0.98
  const hoverAnimDuration = .05 / theme.animSpeed
  const pressAnimDuration = .05 / theme.animSpeed

  const hoverColor: ColorValue = props.style?.backgroundColor
    ? darken(props.style?.backgroundColor)
    : 'grey'

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
        animateOnHover ?? true
          ? {
              backgroundColor: hoverColor,
              borderColor: hoverColor,
              transition: {
                duration: hoverAnimDuration,
              },
            }
          : undefined
      }
      whileTap={
        animateOnPress
          ? {
              backgroundColor: hoverColor,
              borderColor: hoverColor,
              scale: pressScale,
              transition: {
                duration: pressAnimDuration,
              },
            }
          : undefined
      }
    >
      {props.children}
    </motion.div>
  )
}
