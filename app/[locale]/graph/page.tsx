"use client";
import { useEffect } from "react";
import { Chart } from "chart.js";
import { useAppContext } from "../AppContext";
import {
  computeMonthsBetweenTwoDate,
  getAmountByMonth,
  getMaxEndDate,
  getMinStartDate,
} from "../libs/graph";
import classes from "./styles/graph.module.css";
import { Transaction } from "../types/transaction";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

type Props = {};

export default function Graph({}: Props) {
  const globalState = useAppContext();
  const transactions = globalState?.transactions;

  const t = useTranslations("Graph");
  const locale = useLocale();

  useEffect(() => {
    if (transactions?.length === 0) return;
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const minStartDate = getMinStartDate(transactions as Transaction[]);
    const maxEndDate = getMaxEndDate(transactions as Transaction[]);
    const months = computeMonthsBetweenTwoDate(
      minStartDate.startDate,
      maxEndDate.endDate
    );
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          new Date(minStartDate?.startDate).toDateString(),
          new Date(maxEndDate.endDate).toDateString(),
        ],
        datasets: [
          {
            data: months.map((month) =>
              getAmountByMonth(transactions as any, month)
            ),
            label: t("amount"),
            borderColor: "#3e95cd",
            backgroundColor: "#7bb6dd",
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
          <SvgIcon />
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

const SvgIcon = () => {
  return (
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
  );
};
// const transactions = [
//   {
//     _id: {
//       $oid: "64de21d9eb55afb95eddd1fe",
//     },
//     amount: -95,
//     name: "seleft drahem lkhoya",
//     userId: {
//       $oid: "64de21caeb55afb95eddd1fb",
//     },
//     startDate: {
//       $date: "2023-08-31T00:00:00.000Z",
//     },
//     endDate: {
//       $date: "2023-09-08T00:00:00.000Z",
//     },
//     createdAt: {
//       $date: "2023-08-17T13:34:17.616Z",
//     },
//     updatedAt: {
//       $date: "2023-08-17T13:34:17.616Z",
//     },
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "64de2ce46e0b7992228821f2",
//     },
//     amount: 500,
//     name: "bac",
//     userId: {
//       $oid: "64de21caeb55afb95eddd1fb",
//     },
//     startDate: {
//       $date: "2023-08-11T00:00:00.000Z",
//     },
//     endDate: {
//       $date: "2023-08-29T00:00:00.000Z",
//     },
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "64de2de46e0b7992228821f9",
//     },
//     amount: 120,
//     name: "Hh",
//     userId: {
//       $oid: "64de21caeb55afb95eddd1fb",
//     },
//     startDate: {
//       $date: "2023-09-07T00:00:00.000Z",
//     },
//     endDate: {
//       $date: "2023-11-07T00:00:00.000Z",
//     },
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "64de2e046e0b7992228821fb",
//     },
//     amount: -700,
//     name: "colonisation islamique",
//     userId: {
//       $oid: "64de21caeb55afb95eddd1fb",
//     },
//     startDate: {
//       $date: "2024-02-07T00:00:00.000Z",
//     },
//     endDate: {
//       $date: "2024-03-07T00:00:00.000Z",
//     },
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "64de2e236e0b7992228821fd",
//     },
//     amount: 320,
//     name: "el fath",
//     userId: {
//       $oid: "64de21caeb55afb95eddd1fb",
//     },
//     startDate: {
//       $date: "2024-02-24T00:00:00.000Z",
//     },
//     endDate: {
//       $date: "2024-04-07T00:00:00.000Z",
//     },
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "64de2e3a6e0b7992228821ff",
//     },
//     amount: -30,
//     name: "one piece",
//     userId: {
//       $oid: "64de21caeb55afb95eddd1fb",
//     },
//     startDate: {
//       $date: "2022-01-24T00:00:00.000Z",
//     },
//     endDate: {
//       $date: "2024-04-07T00:00:00.000Z",
//     },
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "64de2e496e0b799222882201",
//     },
//     amount: -30,
//     name: "osnk",
//     userId: {
//       $oid: "64de21caeb55afb95eddd1fb",
//     },
//     startDate: {
//       $date: "2022-01-30T00:00:00.000Z",
//     },
//     endDate: {
//       $date: "2024-04-07T00:00:00.000Z",
//     },
//     __v: 0,
//   },
// ];
