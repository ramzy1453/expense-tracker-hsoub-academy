"use client";
import React from "react";
import classes from "../styles/add-transaction.module.css";
import { createTransaction } from "../../libs/requests";
import { useAppContext } from "../../AppContext";
import { useTranslations } from "next-intl";

export default function AddTransaction() {
  const t = useTranslations("Home");
  const globalState = useAppContext();
  const [name, setName] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || amount === "" || startDate === "") return;
    const transaction = await createTransaction(
      name,
      parseFloat(amount),
      new Date(startDate),
      globalState?.auth?.token
    );
    globalState?.addTransaction(transaction);
  };

  return (
    <form className={classes["transaction-form"]} onSubmit={onSubmit}>
      <div>
        <label htmlFor="text" className={classes["form-label"]}>
          {t("name")}
        </label>
        <input
          value={name}
          onChange={handleChangeName}
          type="text"
          id="text"
          placeholder={t("enterName")}
          className={classes["form-input"]}
        />
      </div>
      <div>
        <label htmlFor="amount" className={classes["form-label"]}>
          {t("amount")}
        </label>
        <input
          value={amount}
          onChange={handleChangeAmount}
          type="text"
          id="amount"
          placeholder={t("enterAmount")}
          className={classes["form-input"]}
        />
      </div>
      <div>
        <label htmlFor="amount" className={classes["form-label"]}>
          {t("startDate")}
        </label>
        <input
          value={startDate}
          onChange={handleChangeStartDate}
          type="date"
          id="start-date"
          className={classes["form-input"]}
        />
      </div>

      <button>{t("addTransaction")}</button>
    </form>
  );
}
