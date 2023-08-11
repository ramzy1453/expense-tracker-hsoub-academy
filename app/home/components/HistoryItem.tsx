"use client";
import React from "react";
import classes from "../styles/history.module.css";
import { Transaction } from "../../types/transaction";
import { deleteTransaction } from "../../libs/requests";
import { useAppContext } from "../../AppContext";

export default function HistoryItem(props: Transaction) {
  const globalState = useAppContext();
  const deleteItem = async () => {
    globalState?.removeTransaction(props._id);
    await deleteTransaction(props._id, globalState?.auth?.token);
  };
  return (
    <div
      title="Double click to delete"
      onDoubleClick={deleteItem}
      style={{
        borderRight:
          props.amount > 0 ? "5px solid #2ecc71" : "5px solid #c0392b",
      }}
      className={classes["history-item"]}
    >
      <div className={classes["history-item__text"]}>{props.name}</div>
      <div className={classes["history-item__amount"]}>{props.amount}</div>
    </div>
  );
}
