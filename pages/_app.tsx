/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/globals.css';
// import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import AuthProvider from '../utils/AuthProvider';
// import Head from 'next/head';
// import { ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import theme from '../src/theme';
// import { createTheme } from '@material-ui/core/styles';
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

/** For Client Side Rendering  */
/** Learned From https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/ */
/** https://studio.apollographql.com/graph/My-Graph-2nke7b/explorer?variant=current */
function MyApp({ Component, pageProps }: any) {
  // React.useEffect(() => {
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   // if (jssStyles) {
  //   //   jssStyles.parentElement.removeChild(jssStyles);
  //   // }
  // }, []);
  return (
    // <React.Fragment>
    //   <Head>
    //     <title>My page</title>
    //     <meta
    //       name="viewport"
    //       content="minimum-scale=1, initial-scale=1, width=device-width"
    //     />
    //   </Head>
    //   <ThemeProvider theme={theme}>
    //     {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    //     <CssBaseline />
    <AuthProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
    //   </ThemeProvider>
    // </React.Fragment>
  );
}
export default MyApp;
