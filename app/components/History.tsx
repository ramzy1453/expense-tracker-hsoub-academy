import React from "react";
import classes from "../styles/history.module.css";
import HistoryItem from "./HistoryItem";
import { Transaction } from "../types/transaction";
type Props = {
  transactions: Transaction[];
};

export default function History({ transactions }: Props) {
  return (
    <div className={classes["history-container"]}>
      {transactions.length > 0 &&
        transactions?.map((transaction) => (
          <HistoryItem key={transaction._id} {...transaction} />
        ))}
      {transactions?.length === 0 && (
        <div className={classes["history-item"]}>No transactions yet</div>
      )}
    </div>
  );
}
