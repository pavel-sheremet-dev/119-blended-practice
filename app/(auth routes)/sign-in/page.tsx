"use client";

import Section from "@/components/Section/Section";
import { Credentials } from "@/lib/api/api";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

const initialValues: Credentials = {
  email: "",
  password: "",
};

export default function SignIn() {
  // 1. login
  // 2. оновлення стану аутентифікації
  // 3. редірект (profile)
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (
    values: Credentials,
    actions: FormikHelpers<Credentials>
  ) => {
    const user = await login(values);
    actions.resetForm();
    setUser(user);
    router.push("/profile");
  };

  return (
    <Section>
      <h1>Login Page</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form style={{ display: "grid", gap: 12, maxWidth: 300 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" required />
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" required />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    </Section>
  );
}
