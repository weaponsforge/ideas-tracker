import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import { account } from "../lib/apwrite";
import { ID } from "../lib/apwrite";
import type { Models } from "appwrite";
import { useRouter } from "next/navigation";

const useAuthApi = () => {
  const [current, setCurrent] = useState<
    Models.User<Models.Preferences> | null
  >(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const register = async (email: string, password: string): Promise<void> => {
    await account.create({
      userId: ID.unique(),
      email,
      password
    });

    await login(email, password);
  };

  const login = async (email: string, password: string): Promise<void> => {
    await account.createEmailPasswordSession({
      email,
      password
    });

    const user = await account.get();
    setCurrent(user);
    router.push("/");
  };

  const logout = async (): Promise<void> => {
    await account.deleteSession("current");
    setCurrent(null);
    router.push("/");
  };

  const getCurrentUser = async () => {
    try {
      const user = await account.get();
      setCurrent(user);
    } catch (_error) {
      setCurrent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return {
    current,
    loading,
    login,
    logout,
    register
  };
};

type AuthContextValue = ReturnType<typeof useAuthApi>;

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authApi = useAuthApi();

  return (
    <AuthContext.Provider value={authApi}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
};
