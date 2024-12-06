import { CSSProperties } from 'react'

type ColorValue = CSSProperties['color']

export interface Theme {
  primaryColor: ColorValue
  backgroundColor: ColorValue
  separatorColor: ColorValue
  iconColor: ColorValue
  cardColor: ColorValue
  listItemColor: ColorValue
  selectedListItemColor: ColorValue
  h1Family: string
  h1Size: number
  h1Color: ColorValue
  h2Family: string
  h2Size: number
  h2Color: ColorValue
  h3Family: string
  h3Size: number
  h3Color: ColorValue
  h4Family: string
  h4Size: number
  h4Color: ColorValue
  h5Family: string
  h5Size: number
  h5Color: ColorValue
  h6Family: string
  h6Size: number
  h6Color: ColorValue
  textFamily: string
  textSize: number
  textColor: ColorValue
  placeholderColor: ColorValue
}
