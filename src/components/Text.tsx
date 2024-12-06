import { useTheme } from '@themes/index'
import { Theme } from '@themes/Theme'
import { CSSProperties } from 'react'

export type TextValue = string | number | Date

export type TextCategories = 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface TextProps {
  value?: TextValue
  category?: TextCategories
}

export function Text(props: TextProps) {
  const defaultCategory: TextCategories = 'text'

  const theme = useTheme()
  const text = toText(props.value)
  const style = getStyle(theme, props.category ?? defaultCategory)

  return <span style={style}>{text}</span>
}

const getStyle = (theme: Theme, category: TextCategories): CSSProperties => {
  switch (category) {
    case 'text':
      return { fontSize: theme.textSize, color: theme.textColor }
    case 'h1':
      return { fontSize: theme.h1Size, color: theme.h1Color }
    case 'h2':
      return { fontSize: theme.h2Size, color: theme.h2Color }
    case 'h3':
      return { fontSize: theme.h3Size, color: theme.h3Color }
    case 'h4':
      return { fontSize: theme.h4Size, color: theme.h4Color }
    case 'h5':
      return { fontSize: theme.h5Size, color: theme.h5Color }
    case 'h6':
      return { fontSize: theme.h6Size, color: theme.h6Color }
    default:
      return {}
  }
}

const toText = (value?: TextValue): string => {
  if (!value) return ''

  if (value instanceof Date) return value.toLocaleDateString()
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'string') return value

  return 'unknown text value type'
}
