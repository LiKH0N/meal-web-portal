import React from "react";
import useSWR from "swr";
import OthersBillForm from "../components/OthersBillForm";
import Loading from "../components/Loading";
import Layout from "../layout/Layout";
import axios from "axios";
import { useLocalStorage } from "@rehooks/local-storage";
const getOthersBillInfo = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [mealUserInfo] = useLocalStorage("mealUserInfo");
  const { data, error } = useSWR(
    `/api/manage/getOthersBillInfo?userPhone=${
      mealUserInfo ? mealUserInfo.phone : null
    }`,
    getOthersBillInfo
  );

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />;
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Others utility bill">
      <OthersBillForm data={data} />
    </Layout>
  );
}
