import prisma from "@/src/lib/prisma";
import { getTranslations } from "next-intl/server";
import styles from "@/src/styles/pages/Client.module.scss";

export default async function ClientDetails({
  params,
}: {
  params: { clientId: string };
}) {
  const t = await getTranslations("Dashboard");
  const { clientId } = params;

  const getClientDetails = async (clientId: string) => {
    try {
      const client = await prisma.client.findUnique({
        where: { id: clientId },
        select: {
          id: true,
          companyName: true,
          email: true,
          telephone: true,
          address: true,
          OIB: true,
        },
      });
      return client;
    } catch (error) {
      console.log(error);
    }
  };

  const client = await getClientDetails(clientId);

  return <div className={styles.container}>client details</div>;
}
