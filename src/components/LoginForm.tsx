
import { useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { TextInput, Button, Text, HelperText, useTheme } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { login, clearError } from "../store/slices/authSlice"
import type { AppDispatch, RootState } from "../store"
import { Eye, EyeOff } from "lucide-react-native"

interface LoginFormProps {
  onSuccess?: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }

    setEmailError("")
    return true
  }

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required")
      return false
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return false
    }

    setPasswordError("")
    return true
  }

  const handleSubmit = async () => {
    // Clear any previous errors
    dispatch(clearError())

    // Validate inputs
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()

    if (!isEmailValid || !isPasswordValid) {
      return
    }

    // Dispatch login action
    const resultAction = await dispatch(login({ email, password }))

    if (login.fulfilled.match(resultAction) && onSuccess) {
      onSuccess()
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={validateEmail}
        error={!!emailError}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      {emailError ? <HelperText type="error">{emailError}</HelperText> : null}

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        onBlur={validatePassword}
        error={!!passwordError}
        secureTextEntry={!showPassword}
        mode="outlined"
        style={styles.input}
        right={
          <TextInput.Icon
            icon={() =>
              showPassword ? (
                <EyeOff size={20} color={theme.colors.onSurfaceVariant} />
              ) : (
                <Eye size={20} color={theme.colors.onSurfaceVariant} />
              )
            }
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      {passwordError ? <HelperText type="error">{passwordError}</HelperText> : null}

      {error ? (
        <HelperText type="error" style={styles.errorText}>
          {error}
        </HelperText>
      ) : null}

      <Button mode="contained" onPress={handleSubmit} loading={isLoading} disabled={isLoading} style={styles.button}>
        Login
      </Button>

      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={[styles.forgotPassword, { color: theme.colors.primary }]}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    marginBottom: 16,
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  forgotPassword: {
    fontSize: 14,
  },
})

export default LoginForm

