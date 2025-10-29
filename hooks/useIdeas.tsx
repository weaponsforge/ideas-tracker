'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import { ID, Query, Permission, Role, type Models } from "appwrite";
import { tablesDB } from "../lib/apwrite";

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID!;
const tableId = process.env.NEXT_PUBLIC_TABLE_ID!;
const queryLimit = 10;

export interface Idea extends Models.Row {
  title: string;
  description: string;
  userId: string;
}

export type AddIdeaParams = Omit<
  Idea,
  | '$id'
  | '$createdAt'
  | '$updatedAt'
  | '$permissions'
  | '$sequence'
  | '$tableId'
  | '$databaseId'
>;

const useIdeasApi = () => {
  const [current, setCurrent] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the 10 most recent ideas from the database
  const fetch = async (): Promise<void> => {
    try {
      const response = await tablesDB.listRows(
        databaseId,
        tableId,
        [Query.orderDesc('$createdAt'), Query.limit(queryLimit)]
      );

      setCurrent((response.rows as unknown as Idea[]));
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const add = async (idea: AddIdeaParams): Promise<void> => {
    try {
      const response = await tablesDB.createRow(
        databaseId,
        tableId,
        ID.unique(),
        idea,
        [
          Permission.read('any'),
          Permission.update(Role.user(idea.userId)),
          Permission.delete(Role.user(idea.userId))
        ]
      );

      setCurrent(prev => [response as unknown as Idea, ...prev].slice(0, queryLimit));
    } catch (error) {
      console.error('Error adding idea: ', error);
    }
  };

  const remove = async (id: string): Promise<void> => {
    try {
      await tablesDB.deleteRow(databaseId, tableId, id);
      await fetch();
    } catch (error) {
      console.error('Error removing idea:', error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    current,
    loading,
    add,
    fetch,
    remove
  };
};

type IdeasContextValue = ReturnType<typeof useIdeasApi>;

const IdeasContext = createContext<IdeasContextValue | null>(null);

export const IdeasProvider = ({ children }: { children: ReactNode }) => {
  const ideas = useIdeasApi();

  return (
    <IdeasContext.Provider value={ideas}>
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeas = (): IdeasContextValue => {
  const ctx = useContext(IdeasContext);

  if (!ctx) {
    throw new Error('useIdeas must be used within IdeasProvider');
  }

  return ctx;
};
