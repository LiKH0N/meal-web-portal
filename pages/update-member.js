import { useRouter } from "next/router";
import React from "react";
import UpdateMemberForm from "../components/UpdateMemberForm";
import Layout from "../layout/Layout";

export default function Index() {
  const router = useRouter();
  const obj = router.query;
  return (
    <Layout pageTitle="Other bill entry">
      <UpdateMemberForm
        id={obj.id}
        name={obj.name}
        joma={obj.joma}
        mealCount={obj.mealCount}
      />
    </Layout>
  );
}
