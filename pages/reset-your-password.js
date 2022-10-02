import React from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import AuthLayout from "../layout/AuthLayout";
export default function Index() {
  return (
    <AuthLayout pageTitle="Reset password">
      <ResetPasswordForm />;
    </AuthLayout>
  );
}
