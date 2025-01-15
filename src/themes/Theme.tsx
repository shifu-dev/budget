import { ColorValue } from "@themes/Colors"

export interface FontValue {
  family: string
  weight:
    | 'thin'
    | 'regular'
    | 'bold'
    | 'heavy'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
}

export interface Theme {
  colors: {
    primary: ColorValue
    background: ColorValue
    card: ColorValue
    text: ColorValue
  }
  fonts: {
    thin: FontValue
    regular: FontValue
    bold: FontValue
    heavy: FontValue
  }

  animSpeed: number
}
