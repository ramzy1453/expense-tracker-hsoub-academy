import { Transaction } from "../types/transaction";

export function getMinMaxDate(transactions: Transaction[], isMin = true): Date {
  const sortedTransactions = transactions.sort(
    (a, b) =>
      (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) *
      (isMin ? 1 : -1)
  );
  return sortedTransactions[0].startDate;
}

export function getIncomesExpense(
  transactions: Transaction[],
  type: "income" | "expense"
): number[] {
  return transactions
    .filter((transaction) =>
      type === "income" ? transaction.amount >= 0 : transaction.amount < 0
    )
    .map((transaction) => transaction.amount);
}
