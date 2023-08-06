"use client";
import React from "react";
import classes from "../styles/add-transaction.module.css";
import { createTransaction } from "../libs/requests";
import { useAppContext } from "./AppContext";

type Props = {};

export default function AddTransaction({}: Props) {
  const globalState = useAppContext();
  const [name, setName] = React.useState<string>("");
  const [amount, setAmount] = React.useState<number>(0);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transaction = await createTransaction(
      name,
      amount,
      globalState?.auth?.token
    );
    globalState?.addTransaction(transaction);
  };

  return (
    <form className={classes["transaction-form"]} onSubmit={onSubmit}>
      <div>
        <label htmlFor="text" className={classes["form-label"]}>
          Name
        </label>
        <input
          value={name}
          onChange={handleChangeName}
          type="text"
          id="text"
          placeholder="Enter text..."
          className={classes["form-input"]}
        />
      </div>
      <div>
        <label htmlFor="amount" className={classes["form-label"]}>
          Amount
        </label>
        <input
          value={amount}
          onChange={handleChangeAmount}
          type="number"
          id="amount"
          placeholder="Enter amount..."
          className={classes["form-input"]}
        />
      </div>
      <button>Add transaction</button>
    </form>
  );
}
