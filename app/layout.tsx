import { ReactNode } from "react";
import { Metadata } from "next";
import hsoubLogo from "./[locale]/assets/hsoub-logo.ico";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Expense Tracker",
  description:
    "Expense tracker is a tool designed to help track financial transactions",
  authors: [
    {
      name: "Hsoub Academy",
    },
    { name: "Ramzy Kemmoun" },
  ],
  icons: [{ rel: "icon", url: hsoubLogo.src }],
};
export default function RootLayout({ children }: Props) {
  return children;
}
