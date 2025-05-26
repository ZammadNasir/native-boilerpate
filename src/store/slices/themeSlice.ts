import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { mmkvStorage, storage } from '../../storage';
import { colorScheme } from '@src/constants/appearence';
import { StorageKeys } from '@src/constants/storageKeys';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  themeMode: ThemeMode;
}

// Get saved theme from storage or default to system
const savedTheme = storage.get(StorageKeys.APP_THEME) as ThemeMode | undefined;

const initialState: ThemeState = {
  themeMode: savedTheme || colorScheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
      mmkvStorage.set(StorageKeys.APP_THEME, action.payload);
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
