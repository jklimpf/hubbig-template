"use server";

import prisma from "@/src/lib/prisma";
import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { FORM_UPDATE_ERROR, FORM_UPDATE_SUCCESS } from "@/src/lib/constants";

export async function createClient(
  prevState: { message: string },
  formData: FormData
) {
  const t = await getTranslations();

  const schema = z.object({
    companyName: z.string().min(1, t("CompanyNameFormErrorLength")),
    email: z.string().email(t("EmailFormError")),
    telephone: z.string().min(6, t("TelephoneFormErrorLength")),
    address: z.string().min(1, t("AddressFormError")),
    OIB: z.string().length(11, t("OIBFormErrorLength")),
  });

  const parsedData = schema.safeParse({
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    telephone: formData.get("telephone"),
    address: formData.get("address"),
    OIB: formData.get("OIB"),
  });

  if (!parsedData.success) {
    const errors: { [key: string]: string } = {};
    parsedData.error.errors.forEach((err) => {
      errors[err.path[0] as string] = err.message;
    });

    return { message: "", errors };
  }

  const data = parsedData.data;

  try {
    const emailExists = await prisma.client.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      return { message: "", errors: { email: t("EmailExistsError") } };
    }

    const createdClient = await prisma.client.create({
      data: {
        companyName: data.companyName,
        email: data.email,
        telephone: data.telephone,
        address: data.address,
        OIB: data.OIB,
      },
    });

    return { message: FORM_UPDATE_SUCCESS, resetKey: createdClient.id };
  } catch (error) {
    return { message: FORM_UPDATE_ERROR };
  }
}

export async function updateClient(
  prevState: { message: string },
  formData: FormData
) {
  const t = await getTranslations();
  const schema = z.object({
    id: z.string().min(1),
    companyName: z.string().min(1, t("CompanyNameFormErrorLength")),
    telephone: z.string().min(6, t("TelephoneFormErrorLength")),
    address: z.string().min(1, t("AddressFormError")),
    OIB: z.string().length(11, t("OIBFormErrorLength")),
  });

  const parsedData = schema.safeParse({
    id: formData.get("id"),
    companyName: formData.get("companyName"),
    telephone: formData.get("telephone"),
    address: formData.get("address"),
    OIB: formData.get("OIB"),
  });

  if (!parsedData.success) {
    const errors: { [key: string]: string } = {};
    parsedData.error.errors.forEach((err) => {
      errors[err.path[0] as string] = err.message;
    });

    return { message: "", errors };
  }

  const data = parsedData.data;

  try {
    const updatedClient = await prisma.client.update({
      where: { id: data.id },
      data: {
        companyName: data.companyName,
        telephone: data.telephone,
        address: data.address,
        OIB: data.OIB,
      },
    });

    return { message: FORM_UPDATE_SUCCESS };
  } catch (error) {
    return { message: FORM_UPDATE_ERROR };
  }
}
