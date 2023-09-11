"use client";
import { useEffect } from "react";
import { Chart } from "chart.js";
import { useAppContext } from "../AppContext";
import { getIncomesExpense, getMinMaxDate } from "../libs/graph";
import { Transaction } from "../types/transaction";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import classes from "./styles/graph.module.css";
import { kill } from "process";

export default function GraphPage() {
  const globalState = useAppContext();
  const transactions = globalState?.transactions;

  const t = useTranslations("Graph");
  const locale = useLocale();

  useEffect(() => {
    if (transactions?.length === 0) return;
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const minDate = getMinMaxDate(transactions as Transaction[], true);
    const maxDate = getMinMaxDate(transactions as Transaction[], false);

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [String(minDate).split("T")[0], String(maxDate).split("T")[0]],
        datasets: [
          {
            data: getIncomesExpense(transactions as Transaction[], "income"),
            label: "Income",
            borderColor: "#2ecc71",
            fill: false,
          },
          {
            data: getIncomesExpense(transactions as Transaction[], "expense"),
            label: "Income",
            borderColor: "#f44e54",
            fill: false,
          },
          {
            data: transactions?.map((t) => t.amount),
            label: "Total amount",
            borderColor: "#0f54a2",
            fill: false,
          },
        ],
      },
    });
  }, []);
  return (
    <>
      <h1 className={classes["title"]}>
        <Link href={`/${locale}/home`}>
          <svg
            style={{
              width: "30px",
              margin: 5,
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z" />
            </g>
          </svg>
        </Link>
        {t("title")} - {globalState?.auth?.user.username}
      </h1>
      <div className={classes["canvas-container"]}>
        <canvas id="myChart"></canvas>
        {transactions?.length === 0 && (
          <div className={classes["no-transactions"]}>
            {t("noTransactionsYet")}
          </div>
        )}
      </div>
    </>
  );
}

function resSend(x: any) {
  return x;
}
const users: { _id: string; username: string }[] = [];

resSend(
  users.map(({ username }, i) => ({
    _id: i + 1,
    username,
  }))
);

function scaler(kx: number, ky: number) {
  return {
    resize: function ([x, y]: [number, number]) {
      return [kx * x, ky * y];
    },
  };
}

scaler(2, 1.5).resize([2, 4]);
