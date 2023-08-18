"use client";
import React from "react";
import classes from "./home.module.css";
import IncomeExpense from "./components/IncomeExpense";
import History from "./components/History";
import AddTransaction from "./components/AddTransaction";
import { useAppContext } from "../AppContext";
import { getTransactions } from "../libs/requests";
import { Transaction } from "../types/transaction";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function HomePage() {
  const globalState = useAppContext();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  const t = useTranslations("Home");
  const locale = useLocale();

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

  const router = useRouter();
  const pathname = usePathname();
  const logout = () => {
    router.push(`/${locale}`);
  };
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPathname = pathname.replace(locale, e.target.value);
    router.replace(newPathname);
  };
  return (
    <div className={classes["dashboard-layout"]}>
      <nav className={classes["nav"]}>
        <select onChange={handleChangeLanguage}>
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
        <button onClick={logout} className={classes["logout"]}>
          Logout
        </button>
      </nav>
      <h1 className={classes["dashboard__title"]}>
        {t("title")} - {globalState?.auth?.user.username}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          href={`/${locale}/graph`}
          className={classes["dashboard__graph-link"]}
        >
          {t("visualizeBalance")}
        </Link>
      </div>
      <div className={classes["dashboard-body"]}>
        <div className={classes["dashboard__balance-container"]}>
          <h2 className={classes["dashboard__balance-title"]}>
            {t("yourBalance")}
          </h2>
          <h1 className={classes["dashboard__balance-price"]}>
            ${globalState?.transactions?.reduce((a, b) => a + b.amount, 0) || 0}
          </h1>
          <IncomeExpense />
        </div>

        <div className={classes["dashboard__history-container"]}>
          <h3 className={classes["dashboard__history-title"]}>
            {t("history")}
          </h3>
          <History transactions={globalState?.transactions as Transaction[]} />
        </div>

        <div className={classes["dashboard__transaction-container"]}>
          <h3 className={classes["dashboard__transaction-title"]}>
            {t("addNewTransaction")}
          </h3>
          <AddTransaction />
        </div>
      </div>
    </div>
  );
}
