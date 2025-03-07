import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { mmkvStorage } from "../../storage"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: mmkvStorage.getString("token") || null,
  isLoading: false,
  error: null,
}

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      // const response = await api.post('/login', { email, password });

      // Simulating API response
      const mockResponse = {
        user: {
          id: "1",
          name: "John Doe",
          email: email,
          avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
        },
        token: "mock-jwt-token",
      }

      // Save token to storage
      mmkvStorage.set("token", mockResponse.token)

      return mockResponse
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed")
    }
  },
)

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    // Clear token from storage
    mmkvStorage.delete("token")
    return null
  } catch (error: any) {
    return rejectWithValue("Logout failed")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer

