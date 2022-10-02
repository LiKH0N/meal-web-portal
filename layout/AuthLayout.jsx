import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
export default function DashboardLayout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{pageTitle ? pageTitle : "Meal Web Portal"}</title>
      </Head>
      <main>
        <Container
        maxWidth="xs"
        sx={{
          background: "#28AAE1",
          p: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          boxShadow: "0 1px 4px 0 rgb(0 0 0 / 50%)",
          my: "50px",
        }}
        >
          {children}
        </Container>
      </main>
    </>
  );
}
