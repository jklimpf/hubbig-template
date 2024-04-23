import React from "react";
import styles from "./Table.module.scss";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import NumberPagination from "../Pagination/NumberPagination";
import { PAGINATION_MAX_NUMBER_OF_PAGES } from "@/src/lib/constants";

type Props = {
  children: JSX.Element | JSX.Element[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  showTopBorder?: boolean;
  searchTerm?: string;
  onSearch: (search: string) => void;
  itemsPerPage: number;
  listItemsNumber: number;
};

const Table = ({
  children,
  className = "",
  showTopBorder = true,
  totalPages,
  currentPage,
  searchTerm,
  onPageChange,
  onSearch,
  itemsPerPage,
  listItemsNumber,
}: Props) => {
  const t = useTranslations();

  return (
    <div className={styles.tableContainer}>
      <div className={styles.searchContainer}>
        {/* <div className={styles.searchButton}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </div> */}
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.currentTarget.value)}
          className={styles.searchInput}
          disabled={!searchTerm && !listItemsNumber}
        />
        <p className={styles.itemsPerPageText}>
          {t("ResultsNumberText", { count: itemsPerPage })}
        </p>
      </div>
      {listItemsNumber !== 0 ? (
        <div>
          <table
            className={`${styles.table} ${
              showTopBorder ? styles.withBorder : ""
            } ${className}`}
          >
            {children}
          </table>
          <NumberPagination
            currentPage={currentPage}
            totalPages={totalPages}
            maxPagesToShow={PAGINATION_MAX_NUMBER_OF_PAGES}
            onPageChange={onPageChange}
          />{" "}
        </div>
      ) : (
        <p className={styles.noResults}>{t("NoResults")}</p>
      )}
    </div>
  );
};

Table.displayName = "Table";
export default Table;
