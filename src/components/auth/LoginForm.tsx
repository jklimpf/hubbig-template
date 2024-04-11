"use client";

import { FormEvent, useState } from "react";
import styles from "./LoginForm.module.scss";
import Input from "../generalInput/Input";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const t = useTranslations("LoginPage");

  const [userData, setUserData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userData;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        console.log(response.error);
        return;
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={loginHandler}>
        <Input
          name="email"
          type="email"
          placeholder={t("email")}
          onChange={onChangeHandler}
        />
        <Input
          name="password"
          type="password"
          placeholder={t("password")}
          onChange={onChangeHandler}
        />
        <button type="submit">{t("login")}</button>
      </form>
    </div>
  );
}
