import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./slices/themeSlice"
import authReducer from "./slices/authSlice"
import laguagerReducer from "./slices/languageSlice"
import { mmkvStorage } from "../storage"

// Create Redux store
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    language: laguagerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: { storage: mmkvStorage },
      },
    }),
})

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

