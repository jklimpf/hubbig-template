import { LoginForm } from "@/src/components/auth/LoginForm";
import { nextAuthOptions } from "@/src/lib/auth/nextAuthOptions";
import styles from "@/src/styles/pages/Login.module.scss";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <LoginForm />
      <br />
      <p>
        Dont have an account?
        <span>
          <Link href={"/register"}>Register</Link>
        </span>
      </p>
    </div>
  );
}
