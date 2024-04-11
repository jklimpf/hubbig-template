"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (
      !data.password ||
      !data.confirmPassword ||
      !data.email ||
      !data.name ||
      data.password !== data.confirmPassword
    ) {
      return;
    }

    const response = await axios.post("/api/auth/register", data);

    if (response.status === 200) {
      router.replace("/login");
    } else {
      console.error(response.data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Name" />
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
