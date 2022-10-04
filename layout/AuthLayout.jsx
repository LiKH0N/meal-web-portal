import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import UserInstruction from "../components/UserInstruction";
import Author from "../components/Author";
export default function DashboardLayout({ children, pageTitle }) {
  return (
    <React.Fragment>
      <Head>
        <title>
          {pageTitle ? pageTitle + " | Meal Web Portal" : "Meal Web Portal"}
        </title>
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
     
      <UserInstruction />
          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <h2>কিভাবে সিস্টেমটি ব্যবহার করবেন।</h2>
            <iframe
              src="https://www.youtube.com/embed/OZapHQmGRko"
              title="কিভাবে সিস্টেমটি ব্যবহার করবেন।"
              frameborder="0"
              allowfullscreen="allowfullscreen"
            ></iframe>
            <Author/>
          </div>
    </React.Fragment>
  );
}
