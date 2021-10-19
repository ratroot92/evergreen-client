import React from 'react';
import '../styles/globals.css';
// import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

/** For Client Side Rendering  */
/** Learned From https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/ */
/** https://studio.apollographql.com/graph/My-Graph-2nke7b/explorer?variant=current */
function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
