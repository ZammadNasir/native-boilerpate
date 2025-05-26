import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageKeys } from '@src/constants/storageKeys';
import { storage } from '@src/storage';
import { Language, User } from '@src/types';

const token = storage.get(StorageKeys.TOKEN) as string;
const user = storage.get(StorageKeys.USER) as User;

interface language_state {
  language: Language;
}

const initialState: language_state = {
  language: token && user?.language ? user?.language : 'en',
};

const language_slicer = createSlice({
  name: 'language',
  initialState,
  reducers: {
    set_language: (state: language_state, action: PayloadAction<any>) => {
      state.language = action.payload;
    },
  },
});

export const { set_language } = language_slicer.actions;

export const lng = initialState.language;

export default language_slicer.reducer;
