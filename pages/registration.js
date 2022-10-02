import React from "react";
import Registration from "../components/RegistrationForm";
import AuthLayout from "../layout/AuthLayout";
export default function Index() {
  return (
    <AuthLayout pageTitle="Registration">
      <Registration />;
    </AuthLayout>
  );
}
