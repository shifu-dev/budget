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
  const category = props.category ?? defaultCategory
  const defaultAlign = 'left-top'
  const align = props.align ?? defaultAlign

  const containerStyle: CSSProperties = {
    display: 'flex',
    height: '100%',
    width: '100%',
  }

  const inputStyle: CSSProperties = {
    border: 'none',
    width: '100%',
    outlineStyle: 'none',
    backgroundColor: 'transparent',
    color: props.color ?? theme.colors.text,
    fontFamily: theme.fonts.regular.family,
  }

  // Category
  switch (category) {
    case 'text':
      inputStyle.fontSize = 15
      break
    case 'h1':
      inputStyle.fontSize = 50
      break
    case 'h2':
      inputStyle.fontSize = 35
      break
    case 'h3':
      inputStyle.fontSize = 30
      break
    case 'h4':
      inputStyle.fontSize = 25
      break
    case 'h5':
      inputStyle.fontSize = 20
      break
    case 'h6':
      inputStyle.fontSize = 17
      break
  }

  // Alignment
  switch (align) {
    case 'left-top':
      containerStyle.alignItems = 'start'
      inputStyle.textAlign = 'left'
      break
    case 'center-top':
      containerStyle.alignItems = 'start'
      inputStyle.textAlign = 'center'
      break
    case 'right-top':
      containerStyle.alignItems = 'start'
      inputStyle.textAlign = 'right'
      break
    case 'left-center':
      containerStyle.alignItems = 'center'
      inputStyle.textAlign = 'left'
      break
    case 'center':
      containerStyle.alignItems = 'center'
      inputStyle.textAlign = 'center'
      break
    case 'right-center':
      containerStyle.alignItems = 'center'
      inputStyle.textAlign = 'right'
      break
    case 'left-bottom':
      containerStyle.alignItems = 'end'
      inputStyle.textAlign = 'left'
      break
    case 'center-bottom':
      containerStyle.alignItems = 'end'
      inputStyle.textAlign = 'center'
      break
    case 'right-bottom':
      containerStyle.alignItems = 'end'
      inputStyle.textAlign = 'right'
      break
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(event.target.value)
  }

  return (
    <div style={containerStyle}>
      <input
        multiple
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
        style={inputStyle}
      />
    </div>
  )
}
