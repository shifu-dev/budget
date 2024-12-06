import { createContext, useContext } from 'react'
import { Theme } from '@themes/Theme'
import { lightTheme } from '@themes/LightTheme'
import { darkTheme } from './DarkTheme'

export interface ThemeProviderProps {
  theme?: Theme
  children: any
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const theme = darkTheme

  return (
    <ThemeContext.Provider
      value={props.theme ?? theme}
      children={props.children}
    />
  )
}

export const ThemeContext = createContext<Theme>(lightTheme)

export const useTheme = (): Theme => {
  return useContext(ThemeContext)
}
