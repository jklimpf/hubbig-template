"use client";
import { useLocale, useTranslations } from "next-intl";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import LocaleSwitcher from "@/src/components/LocaleSwither";

export default function Index() {
  const t = useTranslations();

  const router = useRouter();
  const locale = useLocale();

  console.log(locale);

  const session = useSession();

  return (
    <div className={styles.description}>
      <LocaleSwitcher />
      <br />
      {session?.data?.user ? session.data.user.email : "no user"}
      <br />
      {t("Index.title")}

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
    </div>
  );
}
