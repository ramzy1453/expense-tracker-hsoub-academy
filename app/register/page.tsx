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

export default function RegisterPage() {
  const router = useRouter();
  const globalState = useAppContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
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
      router.push("/");
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
        <h1 className={classes["form-title"]}>Welcome !</h1>
        <p className={classes["form-subtitle"]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum vitae
          nulla repudiandae porro dolore quae. Est architecto deleniti
          perspiciatis dicta aliquam dolores explicabo
        </p>
        <form className={classes["form"]} onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <p className={classes["form-subtitle"]}>
              Already have an account ?
              <Link href="/login" className={classes["form-link"]}>
                Login
              </Link>
            </p>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={classes["form-group"]}>
            <button type="submit" className={classes["form-button"]}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
