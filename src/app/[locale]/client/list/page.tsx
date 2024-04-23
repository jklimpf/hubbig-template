"use client";
import Table from "@/src/components/Table/Table";
import TableHeader from "@/src/components/Table/TableHeader";
import TableRow from "@/src/components/Table/TableRow";
import { Client } from "@/src/lib/interfaces/clientInterfaces";
import styles from "@/src/styles/pages/client/ClientList.module.scss";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientList() {
  const t = useTranslations();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState<Client[]>([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;

  const fetchClients = async (page: number, searchTerm: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/client?currentPage=${page}&itemsPerPage=${itemsPerPage}&searchTerm=${searchTerm}`
      );

      if (response.status === 200 && response.data) {
        console.log(response);
        setList(response.data.clients);
        setCount(response.data.count);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients(currentPage, search);
  }, [currentPage, search]);

  const columns = [
    {
      key: "id",
      value: "ID",
      className: styles.w250px,
    },
    {
      key: "companyName",
      value: t("CompanyName"),
      className: styles.w160px,
    },
    {
      key: "email",
      value: t("Email"),
      className: styles.w160px,
    },
    {
      key: "telephone",
      value: t("Telephone"),
      className: styles.w160px,
    },
    {
      key: "address",
      value: t("Address"),
      className: styles.w100px,
    },
    {
      key: "OIB",
      value: t("OIB"),
      className: styles.w100px,
    },
    { key: "actions", value: "", className: "" },
  ];

  const pageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

  const searchHandler = (search: string) => {
    setCurrentPage(1);
    setSearch(search);
  };

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {/* {isLoading && <p>loading</p>}
        {!isLoading && list.length === 0 && <p>No clients</p>} */}
        <Table
          totalPages={Math.ceil(count / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={pageChangeHandler}
          onSearch={searchHandler}
          itemsPerPage={list.length}
          searchTerm={search}
          listItemsNumber={list.length}
        >
          <TableHeader columns={columns} />
          <tbody>
            {list.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  columns={columns}
                  row={row}
                  onDetailsClick={() => router.push(`/client/${row.id}`)}
                  onEditClick={(rowId) => router.push(`/client/${rowId}/edit`)}
                  searchTerm={search}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
