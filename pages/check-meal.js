import React from "react";
import CheckMealForm from "../components/CheckMealForm";
import Layout from "../layout/Layout";
export default function Index() {
  return (
    <Layout pageTitle="Check your meal">
      <CheckMealForm />
    </Layout>
  );
}
