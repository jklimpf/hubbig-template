import ClientForm from "@/src/components/Client/ClientForm";
import styles from "@/src/styles/pages/Client.module.scss";

export default function AddNewClient() {
  return (
    <div className={styles.container}>
      <ClientForm />
    </div>
  );
}
