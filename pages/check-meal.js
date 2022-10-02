import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import CheckMealForm from "../components/CheckMealForm";
export default function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Meal checking system</title>
      </Head>
      <Container
        maxWidth="md"
        sx={{
          background: "#F7F8F9",
          p: "10px",
          borderRadius: "10px",
          borderTop: "3px solid #FF9D14",
          border: "1px soldi #ccc",
          boxShadow: "0 1px 4px 0 rgb(0 0 0 / 50%)",
          my: "50px",
        }}
      >
        <CheckMealForm />
      </Container>
    </React.Fragment>
  );
}
