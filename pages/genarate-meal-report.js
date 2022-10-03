import React from "react";
import useSWR from "swr";
import PdfCom from "../components/PdfCom";
import Loading from "../components/Loading";
import PdfLayout from "../layout/PdfLayout";
import axios from "axios";
import { useLocalStorage } from "@rehooks/local-storage";
const getPersonList = (url) => axios.get(url).then((res) => res.data);
export default function Index() {
  const [mealUserInfo] = useLocalStorage("mealUserInfo");
  const { data, error } = useSWR(
    `/api/manage/getPdfInfo?userPhone=${
      mealUserInfo ? mealUserInfo.phone : null
    }`,
    getPersonList
  );

  if (!data) {
    return (
      <PdfLayout pageTitle="Loading...">
        <Loading />
      </PdfLayout>
    );
  }
  return (
    <PdfLayout pageTitle="Meal report">
      <PdfCom data={data} />
    </PdfLayout>
  );
}
