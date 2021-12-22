import React from 'react'

import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import '../styles/globals.css'
import '../components/Shop/style/QuantityCounter.css'

import AppProvider from '../context/appContext';

function EvergreenApp({Component,pageProps}:any) {
  return (
    <AppProvider>

<Component {...pageProps} />

    </AppProvider>
  )
}
export default EvergreenApp;