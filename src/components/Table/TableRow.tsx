import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useEffect, useRef, useState } from "react";
import styles from "./TableRow.module.scss";

interface Props {
  columns: { key: string; value: string; className?: string }[];
  row: { id: string; [key: string]: any };
  onDetailsClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  searchTerm?: string;
}

export default function TableRow({
  columns,
  row,
  onDetailsClick = () => {},
  onEditClick = () => {},
  searchTerm,
}: Props) {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  const actionButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node;

      if (
        actionButtonRef.current &&
        !actionButtonRef.current.contains(targetNode)
      ) {
        setIsActionMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const cellData = (column: {
    key: string;
    value: string;
    className?: string;
  }) => {
    const value = row[column.key];

    switch (column.key) {
      case "actions": {
        return (
          <div
            onClick={() => setIsActionMenuOpen((prev) => !prev)}
            className={styles.actionButton}
            ref={actionButtonRef}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
            {isActionMenuOpen && (
              <div className={styles.actionMenu}>
                <div className={styles.actionMenuItem}>Copy</div>
                <div
                  className={styles.actionMenuItem}
                  onClick={() => onEditClick(row.id)}
                >
                  Edit
                </div>
                <div
                  className={styles.actionMenuItem}
                  onClick={() => onDetailsClick(row.id)}
                >
                  Details
                </div>
                <div
                  className={`${styles.actionMenuItem} ${styles.actionItemWarning}`}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        );
      }
      default: {
        return (
          <div
            className={`${styles.rowText} ${
              searchTerm && value.toString().includes(searchTerm)
                ? styles.highlight
                : ""
            } ${column.className}`}
          >
            {value}
          </div>
        );
      }
    }
  };

  return (
    <tr className={styles.row}>
      {columns.map((column) => (
        <td key={column.key} className={styles.rowCell}>
          {cellData(column)}
        </td>
      ))}
    </tr>
  );
}
