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

export default function LoginPage() {
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
      router.push("/home");
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
        <h1 className={classes["form-title"]}>Hello Again !</h1>
        <p className={classes["form-subtitle"]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum vitae
          nulla repudiandae porro dolore quae. Est architecto deleniti
          perspiciatis dicta aliquam dolores explicabo
        </p>
        <form className={classes["form"]} onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <p className={classes["form-subtitle"]}>
              Don't have an account ?
              <Link href="/register" className={classes["form-link"]}>
                Register
              </Link>
            </p>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className={classes["form-group"]}>
            <button type="submit" className={classes["form-button"]}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
