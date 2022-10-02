import React from "react";
import AddForm from "../components/AddForm";
import Layout from "../layout/Layout";

export default function Index() {
  return (
    <Layout pageTitle="Add new person">
      <AddForm />
    </Layout>
  );
}
