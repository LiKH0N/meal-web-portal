import React from "react";
import useSWR from "swr";
import Home from "../components/Home";
import Loading from "../components/Loading";
import Layout from "../layout/Layout";
import axios from "axios";
import { useLocalStorage } from "@rehooks/local-storage";
const getPersonList = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [mealUserInfo] = useLocalStorage("mealUserInfo");
  const { data, error } = useSWR(
    `/api/manage/getDeshboardInfo?userPhone=${
      mealUserInfo ? mealUserInfo.phone : null
    }`,
    getPersonList
  );

  if (!data) {
    return (
      <Layout pageTitle="Loading...">
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Welcome to meal web portal">
      <Home data={data} />
    </Layout>
  );
}
