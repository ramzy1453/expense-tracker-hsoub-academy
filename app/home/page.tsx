"use client";
import React from "react";
import classes from "./home.module.css";
import IncomeExpense from "./components/IncomeExpense";
import History from "./components/History";
import AddTransaction from "./components/AddTransaction";
import { useAppContext } from "../AppContext";
import { getTransactions } from "../libs/requests";
import { Transaction } from "../types/transaction";

type Props = {};

export default function DashboardPage(props: Props) {
  const globalState = useAppContext();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const response = await getTransactions(globalState?.auth?.token);
      if (response?.message) {
        setError(response.message);
      }
      globalState?.setTransactions(response);

      setLoading(false);
    };
    fetchTransactions();
  }, []);

  return (
    <div className={classes["dashboard-layout"]}>
      <h1 className={classes["dashboard__title"]}>
        Expense Tracker - {globalState?.auth?.user.username}
      </h1>
      <div className={classes["dashboard-body"]}>
        <div className={classes["dashboard__balance-container"]}>
          <h2 className={classes["dashboard__balance-title"]}>YOUR BALANCE</h2>
          <h1 className={classes["dashboard__balance-price"]}>
            ${globalState?.transactions?.reduce((a, b) => a + b.amount, 0) || 0}
          </h1>
          <IncomeExpense />
        </div>

        <div className={classes["dashboard__history-container"]}>
          <h3 className={classes["dashboard__history-title"]}>History</h3>
          <History transactions={globalState?.transactions as Transaction[]} />
        </div>

        <div className={classes["dashboard__transaction-container"]}>
          <h3 className={classes["dashboard__transaction-title"]}>
            Add New Transaction
          </h3>
          <AddTransaction />
        </div>
      </div>
    </div>
  );
}
