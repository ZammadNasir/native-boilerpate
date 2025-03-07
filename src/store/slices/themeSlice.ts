import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { mmkvStorage } from "../../storage"

type ThemeMode = "light" | "dark" | "system"

interface ThemeState {
  themeMode: ThemeMode
}

// Get saved theme from storage or default to system
const savedTheme = mmkvStorage.getString("themeMode") as ThemeMode | undefined

const initialState: ThemeState = {
  themeMode: savedTheme || "system",
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload
      mmkvStorage.set("themeMode", action.payload)
    },
  },
})

export const { setThemeMode } = themeSlice.actions
export default themeSlice.reducer

