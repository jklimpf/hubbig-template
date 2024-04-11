"use client";
import LocaleSwitcher from "@/src/components/LocaleSwither";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Dashboard");
  return (
    <div>
      <LocaleSwitcher />
      <h1>{t("title")}</h1>
    </div>
  );
}
