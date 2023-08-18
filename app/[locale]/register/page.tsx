"use client";

import React from "react";
import classes from "./register.module.css";
import cashImages from "../assets/cash.png";
import hsoubLogo from "../assets/hsoub.png";
import Image from "next/image";
import { register } from "../libs/requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../AppContext";
import { useTranslations, useLocale } from "next-intl";

export default function RegisterPage() {
  const router = useRouter();
  const globalState = useAppContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const locale = useLocale();
  const t = useTranslations("Register");
  console.log(locale, "chinois");
  console.log(`${locale}/login`);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register(email, password, username, confirmPassword);
    if (response?.message) {
      alert(response.message);
    } else {
      globalState?.authenticate({
        user: response.user,
        token: response.token,
      });
      alert("Register Successfully");
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
          <Image width={150} height={50} alt="Login Image" src={hsoubLogo} />
        </div>
        <h1 className={classes["form-title"]}>{t("title")}</h1>
        <p className={classes["form-subtitle"]}>{t("description")} </p>
        <form className={classes["form"]} onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <p className={classes["form-subtitle"]}>
              {t("alreadyHaveAccount")}
              <Link href={`/${locale}`} className={classes["form-link"]}>
                {t("login")}
              </Link>
            </p>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="username">{t("username")}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor="password">{t("confirmPassword")}</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={classes["form-group"]}>
            <button type="submit" className={classes["form-button"]}>
              {t("register")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
