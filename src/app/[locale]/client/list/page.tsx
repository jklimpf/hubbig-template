import prisma from "@/src/lib/prisma";
import styles from "@/src/styles/pages/Client.module.scss";
import { getTranslations } from "next-intl/server";

export default async function ClientList() {
  const t = await getTranslations();

  const clientList = await prisma.client.findMany({
    select: {
      id: true,
      companyName: true,
      email: true,
      telephone: true,
      address: true,
      OIB: true,
    },
  });

  const columns = [
    {
      key: "ID",
      value: "ID",
      className: "",
    },
    {
      key: "companyName",
      value: t("CompanyName"),
      className: "",
    },
    {
      key: "email",
      value: t("Email"),
      className: "",
    },
    {
      key: "telephone",
      value: t("Telephone"),
      className: "",
    },
    {
      key: "address",
      value: t("Address"),
      className: "",
    },
    {
      key: "OIB",
      value: t("OIB"),
      className: "",
    },
  ];

  return (
    <div className={styles.container}>
      <table></table>
    </div>
  );
}
