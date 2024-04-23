import styles from "./TableHeader.module.scss";

interface Props {
  columns: { key: string; value: string; className?: string }[];
}

export default function TableHeader({ columns }: Props) {
  return (
    <thead className={styles.header}>
      <tr>
        {columns.map((column) => (
          <th key={column.key} className={styles.columnCell}>
            {column.value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
