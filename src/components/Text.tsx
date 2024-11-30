export type TextValue = string | number | Date

export type TextCategories = 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface TextProps {
  value: TextValue
  category?: TextCategories
}

export function Text(props: TextProps) {
  const text = toText(props.value)

  return <>{text}</>
}

const toText = (value: TextValue): string => {
  if (value instanceof Date) return value.toLocaleDateString()
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'string') return value

  return 'unknown text value type'
}
