"use client";
import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { IAuth } from "./types/user";
import { Transaction } from "./types/transaction";
import useLocalStorage from "./hooks/useLocalStorage";

type Props = {
  children: ReactNode;
};

type AppContextType = {
  auth?: IAuth;
  transactions: Transaction[];
  authenticate: (auth?: IAuth) => void;
  addTransaction: (transaction: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
  removeTransaction: (id: string) => void;
} | null;

const AppContext = createContext<AppContextType | undefined>({
  auth: undefined,
  transactions: [],
  authenticate: () => {},
  addTransaction: () => {},
  setTransactions: () => {},
  removeTransaction: () => {},
});

export const AppProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { auth, setAuth, handleSaveStorage } = useLocalStorage();
  if (auth)
    return (
      <AppContext.Provider
        value={{
          auth,
          transactions,
          authenticate: (auth?: IAuth) => {
            setAuth(auth);
            handleSaveStorage(auth);
          },
          addTransaction: (transaction: Transaction) => {
            setTransactions([...transactions, transaction]);
          },
          setTransactions: (transactions: Transaction[]) => {
            setTransactions(transactions);
          },
          removeTransaction: (id: string) => {
            setTransactions((transactions) =>
              transactions.filter((t) => t._id !== id)
            );
          },
        }}
      >
        {children}
      </AppContext.Provider>
    );
};
export const useAppContext = () => useContext(AppContext);
