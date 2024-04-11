"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "../i18n";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const currentLocale = useLocale();
  const router = useRouter();

  const redirectedPathName = (locale: string) => {
    console.log(pathName);
    if (!pathName) return "/";

    const addedLocale = "/" + locale + pathName;
    router.replace(addedLocale);
  };

  return (
    <ul className="">
      {locales.map((locale) => {
        return (
          <li key={locale}>
            <div
              onClick={() => {
                if (locale === currentLocale) return;
                redirectedPathName(locale);
              }}
              className=""
            >
              {locale}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
