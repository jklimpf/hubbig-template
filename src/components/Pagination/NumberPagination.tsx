import styles from "./NumberPagination.module.scss";

interface Props {
  currentPage: number;
  totalPages: number;
  maxPagesToShow: number;
  onPageChange: (page: number) => void;
}

export default function NumberPagination({
  currentPage,
  totalPages,
  maxPagesToShow,
  onPageChange,
}: Props) {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <div
          className={`${styles.paginationButton} ${
            currentPage === 1 ? styles.disabledButton : ""
          }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          {"<"}
        </div>

        {Array.from(
          {
            length: totalPages > maxPagesToShow ? maxPagesToShow : totalPages,
          },
          (_, i) => {
            const pageNumber =
              currentPage > maxPagesToShow
                ? i + currentPage - maxPagesToShow + 1
                : i + 1;
            const isCurrentPage = currentPage === pageNumber;

            return (
              <div
                key={pageNumber}
                className={`${styles.paginationButton} ${
                  isCurrentPage ? styles.active : ""
                }`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </div>
            );
          }
        )}

        <div
          className={`${styles.paginationButton} ${
            currentPage === totalPages || !totalPages
              ? styles.disabledButton
              : ""
          }`}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
        >
          {">"}
        </div>
      </div>
    </div>
  );
}
