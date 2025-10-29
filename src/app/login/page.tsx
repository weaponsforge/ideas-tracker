'use client'

import { AuthProvider } from "../../../hooks/useAuth"
import LoginComponent from "./LoginComponent"

const LoginPage = () => {
  return (
    <AuthProvider>
      <LoginComponent />
    </AuthProvider>
  )
}

export default LoginPage
