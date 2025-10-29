import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { account } from "../lib/apwrite";
import { ID } from "../lib/apwrite";
import type { Models } from "appwrite";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [current, setCurrent] = useState<Models.Session | null>(null);
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const register = async (email: string, password: string): Promise<void> => {
    await account.create({
      userId: ID.unique(),
      email,
      password
    })

    await login(email, password)
  }

  const login = async (email: string, password: string): Promise<void> => {
    const session = await account.createEmailPasswordSession({
      email,
      password
    })

    console.log('---SESSION', session)

    setCurrent(session)
    router.push('/')
  }

  const logout = async (): Promise<void> => {
    await account.deleteSession('current')
    setCurrent(null)
    router.push('/')
  }

  const getCurrentUser = async () => {
    try {
      const user = await account.get()
      setCurrent(user)
    } catch (error) {
      setCurrent(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return {
    current,
    loading,
    login,
    logout,
    register
  }
}