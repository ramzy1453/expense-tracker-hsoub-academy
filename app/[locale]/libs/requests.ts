import { Transaction } from "../types/transaction";
import { IAuth } from "../types/user";

const BASE_URL = `http://localhost:3000/api/`;

export async function login(
  email: string,
  password: string
): Promise<IAuth & { message?: string }> {
  const response = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function register(
  email: string,
  password: string,
  username: string,
  confirmationPassword: string
): Promise<IAuth & { message?: string }> {
  const response = await fetch(BASE_URL + "/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
      confirmationPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export const getTransactions = async (
  token?: string
): Promise<Transaction[] & { message?: string }> => {
  const response = await fetch(BASE_URL + "/transaction", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const createTransaction = async (
  name: string,
  amount: number,
  startDate: Date,
  token?: string
): Promise<Transaction & { message?: string }> => {
  const response = await fetch(BASE_URL + "/transaction", {
    method: "POST",
    body: JSON.stringify({ name, amount, startDate }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const deleteTransaction = async (
  id: string,
  token?: string
): Promise<Transaction & { message?: string }> => {
  const response = await fetch(BASE_URL + "/transaction/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
