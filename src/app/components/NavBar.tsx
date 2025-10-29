'use client'

import Link from "next/link"
import { useAuth } from "../../../hooks/useAuth"

const NavBar = () => {
  const { current, logout } = useAuth()

  const btnLogout = <div className="main-header-end u-margin-inline-end-16">
    <div className="flex flex-col">
      <div><b>{current?.email}</b></div>
      <div>{current?.$id}</div>
    </div>

    <button
      className="button"
      type="button"
      onClick={logout}
    >
      Logout
    </button>
  </div>

  const btnLogin = <Link
    href="/login"
    className="button u-margin-inline-end-16"
  >
      Login
  </Link>

  return (
    <nav className="main-header u-padding-inline-end-0">
      <h3 className="u-stretch eyebrow-heading-1">Idea Tracker</h3>
        {current
          ? btnLogout
          : btnLogin
        }
    </nav>
  )
}

export default NavBar
