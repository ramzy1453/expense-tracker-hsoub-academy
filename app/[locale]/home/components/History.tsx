import React from "react";
import classes from "../styles/history.module.css";
import HistoryItem from "./HistoryItem";
import { Transaction } from "../../types/transaction";
import { useTranslations } from "next-intl";

type Props = {
  transactions: Transaction[];
};

export default function History(props: Props) {
  const t = useTranslations("Home");
  const sortedTransactions = props.transactions.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  return (
    <div className={classes["history-container"]}>
      {sortedTransactions.length > 0 &&
        sortedTransactions?.map((transaction) => (
          <HistoryItem key={transaction._id} {...transaction} />
        ))}
      {sortedTransactions?.length === 0 && (
        <div className={classes["history-item"]}>{t("noTransactionsYet")}</div>
      )}
    </div>
  );
}
