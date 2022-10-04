import "../styles/globals.css";
import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
const clientSideEmotionCache = createEmotionCache();
import Marquee from "react-fast-marquee";
import UserInstruction from "../components/UserInstruction";
export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Marquee
            gradient={false}
            speed={30}
            style={{ width: "80%", margin: "auto", marginTop: "20px" }}
          >
            আপনার ডাটা আমাদের কাছে সম্পুর্ন ভাবে নিরাপদে থাকবে। তাই, আপনি কোন
            প্রকার দুশ্চিন্তা না করে আজ থেকে এখানেই মিলের সকল হিসাব রাখুন। এটি
            সম্পুর্ন ফ্রি!
          </Marquee>
          <Component {...pageProps} />

          <UserInstruction />
          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <h2>কিভাবে সিস্টেমটি ব্যবহার করবেন।</h2>
            <iframe
              src="https://www.youtube.com/embed/OZapHQmGRko"
              title="কিভাবে সিস্টেমটি ব্যবহার করবেন।"
              frameborder="0"
              allowfullscreen="allowfullscreen"
            ></iframe>
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
