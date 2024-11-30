import { Theme } from '@themes/Theme'
import { lightTheme } from '@themes/LightTheme'
import { colors } from '@themes/Colors'

export const darkTheme: Theme = {
  ...lightTheme,

  primaryColor: colors.onyx,
  backgroundColor: colors.black,
  separatorColor: colors.white,
  iconColor: colors.white,
  cardColor: colors.matteBlack,
  listItemColor: colors.matteBlack,
  selectedListItemColor: colors.onyx,
  h1Color: colors.white,
  h2Color: colors.white,
  h3Color: colors.white,
  h4Color: colors.white,
  h5Color: colors.white,
  h6Color: colors.white,
  textColor: colors.white,
  placeholderColor: 'grey',
}
