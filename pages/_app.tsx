// /* eslint-disable no-unused-vars */
// import React from 'react';
// import '../styles/globals.css';
// import 'bootstrap/dist/css/bootstrap.css';

// function MyApp({ Component, pageProps }: any) {
//   return <Component {...pageProps} />;
// }
// export default MyApp;

import App, { AppContext } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import React from 'react';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const appProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    console.log('appProps', appProps);
    return { appProps: appProps };
  }

  render() {
    const { Component, appProps }: any = this.props;
    return (
      <Provider store={store}>
        <Component {...appProps} />
      </Provider>
    );
  }
}

const makeStore = () => store;
export default withRedux(makeStore)(MyApp);
