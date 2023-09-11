"use client";

import "./globals.css";
import type { Metadata } from "next";
import { AppProvider } from "./AppContext";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import hsoubLogo from "./assets/hsoub.png";

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

type StaticParams = {
  locale: string;
};
export function generateStaticParams(): StaticParams[] {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProvider>
            <>
              {children}
              <footer>2023 © Copyright Hsoub Academy</footer>
            </>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
