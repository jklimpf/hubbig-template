"use client";
import { useLocale, useTranslations } from "next-intl";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import LocaleSwitcher from "@/src/components/LocaleSwitcher";
import axios from "axios";

export default function Index() {
  const t = useTranslations();

  const router = useRouter();
  const locale = useLocale();

  const session = useSession();

  const getUsersHandler = async () => {
    const response = await axios.get("/api/user/get-all-users");
  };

  return (
    <div className={styles.description}>
      <LocaleSwitcher />
      <br />
      {session?.data?.user ? session.data.user.email : "no user"}
      <br />
      {t("Index.title")}
      wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
      {session?.data?.user ? (
        <button
          onClick={() =>
            signOut({ redirect: true, callbackUrl: `/${locale}/login` })
          }
        >
          sign out
        </button>
      ) : (
        <button onClick={() => router.push(`/${locale}/login`)}>
          login page
        </button>
      )}
      <br />
      <button onClick={() => router.push("/dashboard")}>
        {t("Dashboard.title")}
      </button>
      <br />
      <button onClick={getUsersHandler}>Get Users</button>
    </div>
  );
}
