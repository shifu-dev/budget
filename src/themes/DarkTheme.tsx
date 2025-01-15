import { Theme } from '@themes/Theme'
import { lightTheme } from '@themes/LightTheme'
import { colors } from '@themes/Colors'

export const darkTheme: Theme = {
  ...lightTheme,

  colors: {
    primary: 'white',
    background: colors.black,
    card: colors.matteBlack,
    text: 'white',
  },
}
