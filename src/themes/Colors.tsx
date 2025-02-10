import { CSSProperties } from 'react'
import chroma from 'chroma-js'

export type ColorValue = NonNullable<CSSProperties['color']>

export const colors = {
  matteBlack: '#28282B',
  onyx: '#353935',
  black: '#000000',
  white: '#FFFFFF',
  transparent: '#00000000',
}

export function darken(color: ColorValue, strength: number = 0.6): ColorValue {
  return chroma(color).darken(strength).hex()
}
