import {
  CSSProperties,
  ChangeEvent,
  HTMLInputAutoCompleteAttribute,
} from 'react'
import { useTheme } from '@themes/index'
import { TextAlign, TextCategories } from '@components/Text'
import { ColorValue } from '@themes/Colors'

export type TextInputType =
  | 'text'
  | 'text-area'
  | 'password'
  | 'email'
  | 'number'

export interface TextInputProps {
  value?: string
  onChange?: (value: string) => void
  category?: TextCategories
  align?: TextAlign
  color?: ColorValue
  type?: TextInputType
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoComplete?: HTMLInputAutoCompleteAttribute
  minValue?: number
  maxValue?: number
  minLength?: number
  maxLength?: number
  pattern?: string
  placeholder?: string
}

export function TextInput(props: TextInputProps) {
  const theme = useTheme()
  const defaultCategory: TextCategories = 'text'
  const defaultAlign: TextAlign = 'left-top'
  const category = props.category ?? defaultCategory
  const align = props.align ?? defaultAlign

  const style: CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    outlineStyle: 'none',
    fontFamily: theme.fonts.regular.family,
    color: props.color ?? theme.colors.text,
  }

  // Category
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

  // Alignment
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

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(event.target.value)
  }

  return (
    <input
      value={props.value}
      onChange={onChange}
      type={props.type}
      required={props.required}
      readOnly={props.readonly}
      disabled={props.disabled}
      autoCapitalize={props.autoCapitalize}
      autoComplete={props.autoComplete}
      min={props.minValue}
      max={props.maxValue}
      minLength={props.minLength}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
      pattern={props.pattern}
      style={style}
    />
  )
}
