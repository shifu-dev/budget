import { useTheme } from '@themes/index'
import { ColorValue } from '@themes/Colors'
import { CSSProperties } from 'react'

export type TextValue = string | number | Date | TextValue[]

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
  color?: ColorValue
  listSeparator?: string
  listStart?: string
  listEnd?: string
}

export function Text(props: TextProps) {
  const defaultListSeparator = ', '
  const defaultListStart = ''
  const defaultListEnd = ''

  const text = _getText(
    props.value,
    props.listSeparator ?? defaultListSeparator,
    props.listStart ?? defaultListStart,
    props.listEnd ?? defaultListEnd,
  )

  const style = _getStyle(props)

  return <span style={style}>{text}</span>
}

export function isTextValue(value: unknown): value is TextValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date
  )
}

const _getStyle = (props: TextProps): CSSProperties => {
  const theme = useTheme()
  const defaultCategory: TextCategories = 'text'
  const defaultAlign: TextAlign = 'left-top'
  const category = props.category ?? defaultCategory
  const align = props.align ?? defaultAlign

  const style: CSSProperties = {
    fontFamily: theme.fonts.regular.family,
    color: props.color ?? theme.colors.text,
  }

  switch (category) {
    case 'text':
      style.fontSize = 15
      break
    case 'h1':
      style.fontSize = 50
      break
    case 'h2':
      style.fontSize = 35
      break
    case 'h3':
      style.fontSize = 30
      break
    case 'h4':
      style.fontSize = 25
      break
    case 'h5':
      style.fontSize = 20
      break
    case 'h6':
      style.fontSize = 17
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

  return style
}

const _getText = (
  value?: TextValue,
  listSeparator?: string,
  listStart?: string,
  listEnd?: string,
): string => {
  if (!value) return ''

  if (value instanceof Date) return value.toLocaleDateString()
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'string') return value

  if (Array.isArray(value)) {
    if (value.length === 0) return ''

    const listString = value
      .map(value => _getText(value, listSeparator, listStart, listEnd))
      .join(listSeparator)

    return `${listStart}${listString}${listEnd}`
  }

  return 'unknown text value type'
}
