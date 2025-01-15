import { Theme } from '@themes/Theme'
import { fonts } from '@themes/Fonts'

export const lightTheme: Theme = {
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'lightgrey',
    text: 'black',
  },

  fonts: {
    thin: { family: fonts.thin, weight: 'thin' },
    regular: { family: fonts.regular, weight: 'regular' },
    bold: { family: fonts.bold, weight: 'bold' },
    heavy: { family: fonts.heavy, weight: 'heavy' },
  },

  animSpeed: 1,
}
