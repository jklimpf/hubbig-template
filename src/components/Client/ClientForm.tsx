"use client";

import { createClient, updateClient } from "@/src/app/actions/client-actions";
import { ClientFormData } from "@/src/lib/interfaces/clientInterfaces";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import styles from "./ClientForm.module.scss";
import { FORM_UPDATE_ERROR, FORM_UPDATE_SUCCESS } from "@/src/lib/constants";
import { useTranslations } from "use-intl";

interface Props {
  updatingClient?: ClientFormData;
}

export default function ClientForm({ updatingClient }: Props) {
  const [createState, createClientFormAction] = useFormState(createClient, {
    message: "",
  });
  const [updateState, updateClientFormAction] = useFormState(updateClient, {
    message: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    companyName?: string;
    email?: string;
    telephone?: string;
    address?: string;
    OIB?: string;
  }>({});
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    if (createState.message) {
      setMessage(createState.message);
    }

    if (createState.message === FORM_UPDATE_SUCCESS) {
      router.push(`/client/${createState.resetKey}/edit`);
    }

    if (updateState.message) {
      setMessage(updateState.message);
    }

    if (createState.errors) {
      setErrors(createState.errors);
    } else if (updateState.errors) {
      setErrors(updateState.errors);
    } else {
      setErrors({});
    }
  }, [updateState, createState]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (message) {
      timeout = setTimeout(() => {
        setMessage("");
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  return (
    <div className={styles.formContainer}>
      {message && (
        <div
          className={`${styles.actionMessage} ${
            message === FORM_UPDATE_ERROR
              ? styles.actionMessageError
              : styles.actionMessageSuccess
          }`}
        >
          {message}
        </div>
      )}
      <h1 className={styles.formLabel}>
        {updatingClient ? t("UpdateClientLabel") : t("CreateClientLabel")}
      </h1>

      <form
        action={
          updatingClient ? updateClientFormAction : createClientFormAction
        }
        // key={createState?.resetKey}
        className={styles.form}
      >
        <input
          type="text"
          id="id"
          name="id"
          defaultValue={updatingClient?.id}
          hidden
        />
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder={t("CompanyName")}
            defaultValue={updatingClient?.companyName}
            className={errors?.companyName && styles.errorInput}
          />
          {errors?.companyName && (
            <p className={styles.errorMessage}>{errors.companyName}</p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("Email")}
            defaultValue={updatingClient?.email}
            disabled={!!updatingClient}
            className={errors?.email && styles.errorInput}
          />
          {errors?.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="tel"
            name="telephone"
            placeholder={t("Telephone")}
            defaultValue={updatingClient?.telephone}
            className={errors?.telephone && styles.errorInput}
          />
          {errors?.telephone && (
            <p className={styles.errorMessage}>{errors.telephone}</p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="address"
            placeholder={t("Address")}
            defaultValue={updatingClient?.address}
            className={errors?.address && styles.errorInput}
          />
          {errors?.address && (
            <p className={styles.errorMessage}>{errors.address}</p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="number"
            name="OIB"
            placeholder={t("OIB")}
            defaultValue={updatingClient?.OIB}
            pattern="[0-9]{11}"
            className={errors?.OIB && styles.errorInput}
          />
          {errors?.OIB && <p className={styles.errorMessage}>{errors.OIB}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>
          {updatingClient ? t("UpdateClientButton") : t("CreateClientButton")}
        </button>
      </form>
    </div>
  );
}
