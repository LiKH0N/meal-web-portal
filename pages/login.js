import React from "react";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../layout/AuthLayout";
export default function Index() {
  return (
    <AuthLayout pageTitle="Login">
      <LoginForm />
    </AuthLayout>
  );
}
