import { ColorValue, darken } from '@themes/Colors'
import { motion } from 'motion/react'
import { CSSProperties, JSX } from 'react'

export interface PressableProps {
  onPress?: () => void
  onHover?: () => void
  onFocus?: () => void
  onFocusLost?: () => void
  onHoverStart?: () => void
  onHoverEnd?: () => void
  style?: CSSProperties
  propagateEvents?: boolean
  animateOnHover?: boolean
  animateOnPress?: boolean
  children?: JSX.Element | JSX.Element[]
}

export function Pressable(props: PressableProps) {
  const animateOnHover = props.animateOnHover ?? true
  const animateOnPress = props.animateOnPress ?? true
  const pressScale = 0.97

  const hoverColor: ColorValue = props.style?.backgroundColor
    ? darken(props.style?.backgroundColor)
    : 'grey'

  return (
    <motion.div
      onClick={event => {
        if (!props.propagateEvents) event.stopPropagation()

        props.onPress?.()
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
        outlineStyle: 'none',
        cursor: 'pointer',
        ...props.style,
      }}
      whileHover={
        animateOnHover ?? true
          ? {
              backgroundColor: hoverColor,
              borderColor: hoverColor,
            }
          : undefined
      }
      whileTap={
        animateOnPress
          ? {
              backgroundColor: hoverColor,
              borderColor: hoverColor,
              scale: pressScale,
            }
          : undefined
      }
    >
      {props.children}
    </motion.div>
  )
}
