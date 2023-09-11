"use client";

import { useEffect, useState } from "react";
import { IAuth } from "../types/user";

export default function useLocalStorage() {
  const [auth, setAuth] = useState<IAuth>();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const jsonAuth = localStorage.getItem("auth");
      const auth = JSON.parse(jsonAuth || "{}");
      setAuth(auth);
    }
  }, []);

  function handleSaveStorage(auth?: IAuth) {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }
  return { auth, setAuth, handleSaveStorage };
}
