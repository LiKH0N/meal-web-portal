import { Box, Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import Options from "../components/Options";
import Contact from "../components/Contact";
export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>
          {pageTitle ? pageTitle + " | Meal Web Portal" : "Meal Web Portal"}
        </title>
      </Head>
      <main
        style={{
          padding: "0px 10px",
          width: "850px",
          marginLeft: { md: "300px" },
        }}
      >
        <Box
          sx={{
            background: "#F7F8F9",
            p: "20px",
            borderRadius: "10px",
            borderTop: "3px solid #FF9D14",
            border: "1px soldi #ccc",
            boxShadow: "0 1px 4px 0 rgb(0 0 0 / 50%)",
            my: "50px",
          }}
        >
          {children}
        </Box>
      </main>
      <Options />
      <Contact />
    </>
  );
}
