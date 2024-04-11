import { nextAuthOptions } from "@/src/app/api/auth/[...nextauth]/route";
import RegistrationForm from "@/src/components/auth/RegistrationForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/");
  }

  return <RegistrationForm />;
}
