import { Container, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import CountUp from "react-countup";
export default function DashboardLayout({ children, pageTitle }) {
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle ? pageTitle : "Meal Web Portal"}</title>
      </Head>
      <main style={{ padding: "0px 5px" }}>
        <Container
          maxWidth="xs"
          sx={{
            background: "#28AAE1",
            p: "20px",
            borderRadius: "10px",
            border: "1px solid #28AAE1",
            boxShadow: "0 1px 4px 0 rgb(0 0 0 / 50%)",
            my: "50px",
          }}
        >
          {children}
        </Container>
      </main>
      {/* <Typography textAlign="center">
        <CountUp delay={2} end={3067} />
      </Typography> */}
    </React.Fragment>
  );
}
