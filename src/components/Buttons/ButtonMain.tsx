"use client";
import styles from "./ButtonMain.module.scss";

interface Props {
  label: string;
  onClick: () => void;
  className?: string;
}

export default function ButtonMain({ label, onClick, className }: Props) {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {label}
    </button>
  );
}
