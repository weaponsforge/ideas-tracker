'use client'

import { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { AuthForm } from "../components/AuthForm"

const LoginPage = () => {
  const { login, register } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('---LOGIN')

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    console.log('---e.target is', e.target)

    await login(
      formData.get('email') as string,
      formData.get('password') as string
    )

    form.reset()
  }

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('---REGISTER', isSignUp)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    await register(
      formData.get('email') as string,
      formData.get('password') as string
    )

    form.reset()
  }

  return (
    <div className="u-max-width-650" style={{ margin: '0 auto' }}>
      <section className="card u-margin-32">
        <h2 className="eyebrow-heading-2">Login/Register</h2>

        <AuthForm
          handleSubmit={isSignUp ? handleRegistration : handleLogin}
          submitType={isSignUp ? 'Sign Up' : 'Log In'}
        />

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="u-margin-block-start-16"
        >
          {isSignUp
            ? 'Already have an account? Log in'
            : "Don't have an account? Sign up"
          }
        </button>
      </section>
    </div>
  )
}

export default LoginPage
