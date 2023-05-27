import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../common/mui/theme";
import createEmotionCache from "../common/mui/emotion";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../common/config";

import Layout from "@/components/layout";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const msalInstance = new PublicClientApplication(msalConfig);

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <MsalProvider instance={msalInstance}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </MsalProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
