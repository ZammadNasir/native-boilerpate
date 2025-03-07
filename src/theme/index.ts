import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from "react-native-paper"
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native"

// Adapt navigation themes to work with React Native Paper
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
})

// Customize light theme
export const lightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    primary: "#0078ac",
    secondary: "#d2112c",
    background: "#f6f6f6",
    surface: "#ffffff",
    error: "#B00020",
    text: "#000000",
    onSurface: "#000000",
    disabled: "#757575",
    placeholder: "#9e9e9e",
    backdrop: "rgba(0,0,0,0.5)",
    notification: "#f50057",
  },
}

// Customize dark theme
export const darkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: "#0078ac",
    secondary: "#d2112c",
    background: "#121212",
    surface: "#1e1e1e",
    error: "#cf6679",
    text: "#ffffff",
    onSurface: "#ffffff",
    disabled: "#757575",
    placeholder: "#9e9e9e",
    backdrop: "rgba(0,0,0,0.5)",
    notification: "#f50057",
  },
}

export type AppTheme = typeof lightTheme

