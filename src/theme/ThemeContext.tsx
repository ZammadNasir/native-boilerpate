

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { setThemeMode } from "../store/slices/themeSlice"
import type { RootState } from "../store"
import { darkTheme, lightTheme } from "./index"

type ThemeContextType = {
  toggleTheme: () => void
  isDarkMode: boolean
  theme: typeof lightTheme
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDarkMode: false,
  theme: lightTheme,
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: (props: ThemeContextType) => React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch()
  const systemColorScheme = useColorScheme()
  const { themeMode } = useSelector((state: RootState) => state.theme)

  const [isDarkMode, setIsDarkMode] = useState(
    themeMode === "system" ? systemColorScheme === "dark" : themeMode === "dark",
  )

  useEffect(() => {
    if (themeMode === "system") {
      setIsDarkMode(systemColorScheme === "dark")
    }
  }, [systemColorScheme, themeMode])

  const toggleTheme = () => {
    const newThemeMode = isDarkMode ? "light" : "dark"
    dispatch(setThemeMode(newThemeMode))
    setIsDarkMode(!isDarkMode)
  }

  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode, theme }}>
      {children({ toggleTheme, isDarkMode, theme })}
    </ThemeContext.Provider>
  )
}

