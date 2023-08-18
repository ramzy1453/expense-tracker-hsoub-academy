import { Transaction } from "../types/transaction";

export function getMinStartDate(transactions: Transaction[]) {
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  return sortedTransactions[0];
}
export function getMaxEndDate(transactions: Transaction[]) {
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );
  return sortedTransactions[0];
}

export function getAmountByMonth(transactions: Transaction[], month: number) {
  const filteredTransactions = transactions.filter((transaction) => {
    return new Date(transaction.startDate).getMonth() === month;
  });
  return filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);
}

export function computeMonthsBetweenTwoDate(minDate: Date, maxDate: Date) {
  const months = [];
  const startMonth = new Date(minDate).getMonth();
  const endMonth = new Date(maxDate).getMonth();
  for (let i = startMonth; i <= endMonth; i++) {
    months.push(i);
  }

  return months;
}
