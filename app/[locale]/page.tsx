"use client";

import React from "react";
import classes from "./login.module.css";
import cashImages from "./assets/cash.png";
import hsoubLogo from "./assets/hsoub.png";
import Image from "next/image";
import { login } from "./libs/requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "./AppContext";
import { useTranslations, useLocale } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const globalState = useAppContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response?.message) {
      alert(response.message);
    } else {
      globalState?.authenticate({
        user: response.user,
        token: response.token,
      });
      router.push(`/${locale}/home`);
    }
  };
  return (
    <div className={classes["login-container"]}>
      <div className={classes["image-login"]}>
        <Image alt="Login Image" src={cashImages} />
      </div>
      <div className={classes["form-container"]}>
        <div className={classes["image-container"]}>
          <Image width={200} height={70} alt="Login Image" src={hsoubLogo} />
        </div>
        <h1 className={classes["form-title"]}>{t("title")}</h1>
        <p className={classes["form-subtitle"]}>{t("description")} </p>
        <form className={classes["form"]} onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <p className={classes["form-subtitle"]}>
              {t("dontHaveAccount")}
              <Link
                href={`/${locale}/register`}
                className={classes["form-link"]}
              >
                {t("register")}
              </Link>
            </p>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className={classes["form-group"]}>
            <button type="submit" className={classes["form-button"]}>
              {t("login")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
