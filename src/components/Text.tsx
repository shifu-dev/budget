import { useTheme } from '@themes/index'
import { CSSProperties } from 'react'

export type TextValue = string | number | Date

export type TextCategories = 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TextAlign =
  | 'left-top'
  | 'center-top'
  | 'right-top'
  | 'left-center'
  | 'center'
  | 'right-center'
  | 'left-bottom'
  | 'center-bottom'
  | 'right-bottom'

export interface TextProps {
  value?: TextValue
  category?: TextCategories
  align?: TextAlign
  style?: CSSProperties
}

export function Text(props: TextProps) {
  const text = _getText(props.value)
  const style = _getStyle(props)

  return <span style={style}>{text}</span>
}

const _getStyle = (props: TextProps): CSSProperties => {
  const theme = useTheme()
  const defaultCategory: TextCategories = 'text'
  const defaultAlign: TextAlign = 'left-top'
  const category = props.category ?? defaultCategory
  const align = props.align ?? defaultAlign
  const style: CSSProperties = {}

  switch (category) {
    case 'text':
      style.fontFamily = theme.textFamily
      style.fontSize = theme.textSize
      style.color = theme.textColor
      break
    case 'h1':
      style.fontFamily = theme.h1Family
      style.fontSize = theme.h1Size
      style.color = theme.h1Color
      break
    case 'h2':
      style.fontFamily = theme.h2Family
      style.fontSize = theme.h2Size
      style.color = theme.h2Color
      break
    case 'h3':
      style.fontFamily = theme.h3Family
      style.fontSize = theme.h3Size
      style.color = theme.h3Color
      break
    case 'h4':
      style.fontFamily = theme.h4Family
      style.fontSize = theme.h4Size
      style.color = theme.h4Color
      break
    case 'h5':
      style.fontFamily = theme.h5Family
      style.fontSize = theme.h5Size
      style.color = theme.h5Color
      break
    case 'h6':
      style.fontFamily = theme.h6Family
      style.fontSize = theme.h6Size
      style.color = theme.h6Color
      break
  }

  switch (align) {
    case 'left-top':
      style.display = 'flex'
      style.justifyContent = 'left'
      style.alignItems = 'start'
      break
    case 'center-top':
      style.display = 'flex'
      style.justifyContent = 'center'
      style.alignItems = 'start'
      break
    case 'right-top':
      style.display = 'flex'
      style.justifyContent = 'right'
      style.alignItems = 'start'
      break
    case 'left-center':
      style.display = 'flex'
      style.justifyContent = 'left'
      style.alignItems = 'center'
      break
    case 'center':
      style.display = 'flex'
      style.justifyContent = 'center'
      style.alignItems = 'center'
      break
    case 'right-center':
      style.display = 'flex'
      style.justifyContent = 'right'
      style.alignItems = 'center'
      break
    case 'left-bottom':
      style.display = 'flex'
      style.justifyContent = 'left'
      style.alignItems = 'end'
      break
    case 'center-bottom':
      style.display = 'flex'
      style.justifyContent = 'center'
      style.alignItems = 'end'
      break
    case 'right-bottom':
      style.display = 'flex'
      style.justifyContent = 'right'
      style.alignItems = 'end'
      break
  }

  return { ...style, ...props.style }
}

const _getText = (value?: TextValue): string => {
  if (!value) return ''

  if (value instanceof Date) return value.toLocaleDateString()
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'string') return value

  return 'unknown text value type'
}
