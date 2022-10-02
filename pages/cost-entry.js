import React from "react";
import CostEntryForm from "../components/CostEntryForm";
import Layout from "../layout/Layout";
import { useLocalStorage } from "@rehooks/local-storage";
export default function Index() {
  const [mealUserInfo] = useLocalStorage("mealUserInfo");
  return (
    <Layout pageTitle="Cost entry">
      <CostEntryForm managerId={mealUserInfo ? mealUserInfo.id : null} />
    </Layout>
  );
}
